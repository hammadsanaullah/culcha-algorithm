import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma/prisma.service';
import { ResponseDto } from '../../config/response.dto';
import {
  RACE_RULE_TYPE,
  DAY,
  WORKOUT_TYPE_DAYS,
  BREAK_RULE_DAYS,
  GYM_SESSION,
  WORKOUT_COMBINATION_BEFORE_AFTER,
  WORKOUT_COMBINATION_STATUS,
  UserPlan,
  Plan,
  PlanSchedule,
  Prisma,
  WORKOUT_TYPE,
  WorkoutTypesCombinations,
  GENDER,
  AlternativeExerciseRules,
  WeekDayExercises,
} from '@prisma/client';
import { addDays, startOfWeek, addWeeks, endOfWeek, isWithinInterval } from 'date-fns';
import { SlotManager } from '../../utils/slotManager';
import { WorkoutWithDetails } from '../../utils/types';
import { shuffle } from 'lodash';

@Injectable()
export class AlgorithmService {
  constructor(private readonly prisma: PrismaService) {}

  async findAthlete(email: string): Promise<ResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new NotFoundException('Athlete not found');
      }

      const athleteId = user.id;

      return {
        message: 'Successfully found athlete!',
        data: { athleteID: athleteId },
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async willBeOnPeriod(
    periodDuration: number, // Duration of the period in days
    cycleDuration: number, // Cycle length in days
    lastPeriodStartDate: Date, // The first day of the last period
    weekToCheck: number, // The week to check
    userPlan: UserPlan, // The user's plan
  ): Promise<boolean> {
    // Calculate the start (Monday) and end (Sunday) of the upcoming week
    const nextWeekStartDate = await this.getStartOfWeek(weekToCheck, userPlan); // Next Monday
    const nextWeekEndDate = endOfWeek(nextWeekStartDate, { weekStartsOn: 1 }); // Next Sunday

    // Calculate the number of cycles from the last period to today
    const today = weekToCheck ? addWeeks(new Date(), 1) : new Date();
    const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriodStartDate.getTime()) / (1000 * 60 * 60 * 24));
    const cyclesSinceLastPeriod = Math.floor(daysSinceLastPeriod / cycleDuration);

    // Calculate the start date of the current cycle
    const currentCycleStartDate = addDays(lastPeriodStartDate, cyclesSinceLastPeriod * cycleDuration);

    // Check for period overlap in the next week
    for (let day = 0; day < periodDuration; day++) {
      const periodDate = addDays(currentCycleStartDate, day);

      if (isWithinInterval(periodDate, { start: nextWeekStartDate, end: nextWeekEndDate })) {
        return true; // The athlete will be on their period during the next week
      }
    }

    return false; // The athlete will not be on their period during the next week
  }

  async findWorkoutsByType(type: WORKOUT_TYPE): Promise<WorkoutWithDetails[]> {
    // find all the workouts of this type, order by duration
    const workouts = await this.prisma.workout.findMany({
      where: {
        type,
        generated: true,
        userClone: false,
      },
      orderBy: {
        durationSeconds: 'desc',
      },
      include: {
        WorkoutParts: {
          include: {
            comments: true,
            breaks: true,
            generatedExercises: true,
            partExercises: { include: { exercise: true } },
          },
        },
        excludedAthletesWorkout: {
          include: {
            user: true,
          },
        },
      },
    });

    // TODO: Currently we are shuffling after fetching the data. This can take a performance hit
    // if the workout data is large. We can move this to the database query itself but this
    // will have to be done by bypassing prisma and using raw SQL queries. Currently out of scope
    // and the performance hit has been communicated to the client.

    // Group workouts by durationSeconds
    const groupedWorkouts = workouts.reduce((groups, workout) => {
      const key = workout.durationSeconds;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(workout);
      return groups;
    }, {} as Record<number, WorkoutWithDetails[]>);

    // Shuffle each group of workouts with the same durationSeconds
    const shuffledWorkouts = Object.values(groupedWorkouts).flatMap((group) => {
      return shuffle(group);
    });

    return shuffledWorkouts;
  }

  async findInjuryWorkoutByType(type: WORKOUT_TYPE): Promise<WorkoutWithDetails[]> {
    // find all the workouts of this type, order by duration
    const workout = await this.prisma.workout.findFirst({
      where: {
        type,
        generated: false,
        userClone: false,
        injury: true,
      },
      orderBy: {
        durationSeconds: 'desc',
      },
      include: {
        WorkoutParts: {
          include: {
            comments: true,
            breaks: true,
            generatedExercises: true,
            partExercises: { include: { exercise: true } },
          },
        },
        excludedAthletesWorkout: {
          include: {
            user: true,
          },
        },
      },
    });

    return workout ? [workout] : [];
  }

  async findHolidayWorkoutByType(type: WORKOUT_TYPE): Promise<WorkoutWithDetails[]> {
    // find all the workouts of this type, order by duration
    const workout = await this.prisma.workout.findFirst({
      where: {
        type,
        generated: false,
        holidayMode: true,
        userClone: false,
      },
      orderBy: {
        durationSeconds: 'desc',
      },
      include: {
        WorkoutParts: {
          include: {
            comments: true,
            breaks: true,
            generatedExercises: true,
            partExercises: { include: { exercise: true } },
          },
        },
        excludedAthletesWorkout: {
          include: {
            user: true,
          },
        },
      },
    });

    return workout ? [workout] : [];
  }

  findValidMandatoryWorkoutCombination(
    durationToCheck: number,
    mandatoryCombinations: {
      workouts: WorkoutWithDetails[];
      position: WORKOUT_COMBINATION_BEFORE_AFTER;
    }[],
    index = 0,
    currentSum = 0,
  ):
    | {
        workout: WorkoutWithDetails;
        position: WORKOUT_COMBINATION_BEFORE_AFTER;
      }[]
    | null {
    // Base case: if we've selected one value from each list
    if (index === mandatoryCombinations.length) {
      return currentSum <= durationToCheck ? [] : null;
    }

    const { workouts, position } = mandatoryCombinations[index];

    // Recursive case: iterate over the current list and attempt to find a valid combination
    for (let i = 0; i < workouts.length; i++) {
      const workout = workouts[i];
      const combination = this.findValidMandatoryWorkoutCombination(
        durationToCheck,
        mandatoryCombinations,
        index + 1,
        currentSum + workout.durationSeconds,
      );

      if (combination !== null) {
        return [{ workout, position }, ...combination]; // Prepend the current value to the valid combination
      }
    }

    return null; // No valid combination found
  }

  async findValidSlot(
    slotManager: SlotManager,
    slotManagerPreviousWeek: SlotManager,
    workout: WorkoutWithDetails,
    originalPlan: Prisma.PlanGetPayload<{
      include: {
        alternativeExerciseRules: true;
      };
    }>,
    userPlan: UserPlan,
    workoutDuration: number,
    existingPlanSchedules: PlanSchedule[],
    restDays: number,
    onPeriod = false,
    isInjured: boolean,
    mandatoryCombinations?: ({
      combinationRulesWorkoutTypes: {
        workoutType: WORKOUT_TYPE;
      };
    } & WorkoutTypesCombinations)[],
  ): Promise<boolean> {
    const availableSlots = slotManager.getAvailableSlots();

    for (const slot of availableSlots) {
      const mandatorWorkoutsBefore: WorkoutWithDetails[] = [];
      const mandatorWorkoutsAfter: WorkoutWithDetails[] = [];
      const optionalWorkoutsBefore: WorkoutWithDetails[] = [];
      const optionalWorkoutsAfter: WorkoutWithDetails[] = [];

      // check if the slot is supposed to be a rest day (2.1)
      if (slotManager.checkRestDay(restDays, slot.sequence, slotManagerPreviousWeek)) {
        // mark as unavailable and continue with the next slot
        slot.isAvailable = false;
        continue;
      }

      // Create block-scoped variables for the current slot
      let currentWorkout = workout;
      let currentWorkoutDuration = workoutDuration;

      // if the slot has holiday mode enabled, swap with holidayMode workout (unless athlete is injured)
      if (slot.holidayMode && !isInjured) {
        const holidayModeWorkout = await this.findHolidayWorkoutByType(workout.type);

        // if there's a holiday workout then use that otherwise just keep the same one
        if (holidayModeWorkout.length > 0) {
          currentWorkout = holidayModeWorkout[0];
          currentWorkoutDuration = holidayModeWorkout[0].durationSeconds;
        }
      }

      // check if the slot duration is enough for the workout with mandatory combinations
      if (mandatoryCombinations) {
        const combinations = await Promise.all(
          mandatoryCombinations.map(async (combination) => {
            let workouts = isInjured
              ? await this.findInjuryWorkoutByType(combination.combinationWorkoutTypes[0])
              : slot.holidayMode
              ? await this.findHolidayWorkoutByType(combination.combinationWorkoutTypes[0])
              : await this.findWorkoutsByType(combination.combinationWorkoutTypes[0]);

            // get normal workouts if no holiday workouts are available
            if (slot.holidayMode && workouts.length <= 0 && !isInjured)
              workouts = await this.findWorkoutsByType(combination.combinationWorkoutTypes[0]);

            return {
              workouts,
              position: combination.allocation,
            };
          }),
        );

        const result = this.findValidMandatoryWorkoutCombination(slot.duration, combinations);

        if (result) {
          console.log('Found a valid combination:');
          result.forEach(({ workout, position }) => {
            console.log(`Workout: ${workout.name}, Position: ${WORKOUT_COMBINATION_BEFORE_AFTER[position]}`);

            position === WORKOUT_COMBINATION_BEFORE_AFTER.Before
              ? mandatorWorkoutsBefore.push(workout)
              : mandatorWorkoutsAfter.push(workout);

            currentWorkoutDuration += workout.durationSeconds;
          });
        } else {
          console.log('No valid combination found');
          continue;
        }
      }

      // check if the slot duration is enough for the workout
      if (slot.duration >= currentWorkoutDuration) {
        // TODO: make break rule check a function
        // map breakRule enum to gym session number
        const breakRuleMap = {
          [BREAK_RULE_DAYS.TwoDayBefore]: 4,
          [BREAK_RULE_DAYS.OneHalfDayBefore]: 3,
          [BREAK_RULE_DAYS.OneDayBefore]: 2,
          [BREAK_RULE_DAYS.HalfDayBefore]: 1,
          [BREAK_RULE_DAYS.HalfDayAfter]: 1,
          [BREAK_RULE_DAYS.OneDayAfter]: 2,
          [BREAK_RULE_DAYS.OneHalfDayAfter]: 3,
          [BREAK_RULE_DAYS.TwoDayAfter]: 4,
        };

        const breakRules = await this.prisma.breakRules.findMany({
          where: {
            planId: originalPlan.id,
            workoutType: workout.type,
          },
        });

        // check if any break rule is violated (2.2)
        let breakRuleViolated = false;
        for (const breakRule of breakRules) {
          const breakRuleSession = breakRuleMap[breakRule.day];

          // TODO: we will change schema later, right now only cater for rules that are before
          if (
            breakRule.day === BREAK_RULE_DAYS.HalfDayAfter ||
            breakRule.day === BREAK_RULE_DAYS.OneDayAfter ||
            breakRule.day === BREAK_RULE_DAYS.OneHalfDayAfter ||
            breakRule.day === BREAK_RULE_DAYS.TwoDayAfter
          ) {
            continue;
          }

          // check if workoutTypes have been scheduled in the break rule sessions
          if (
            slotManager.checkAssignedWorkoutTypes(
              breakRuleSession,
              breakRule.selectedWorkoutTypes,
              slot.sequence,
              slotManagerPreviousWeek,
            )
          ) {
            // if they have, then rule violated - look for another available slot
            breakRuleViolated = true;
            break;
          }
        }

        if (breakRuleViolated) {
          continue;
        }

        // if here, means no break rules violated
        // check low intensity rules (2.3)
        const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
          where: {
            planId: originalPlan.id,
          },
        });

        let lowIntensityBeingScheduled = false;

        // TODO: extra check for checking placement of high intensity workouts,
        // will happen in rare cases, client suggested to ignore for now

        // check if any high intensity workouts have been scheduled in the last 2 days consecutively
        if (
          slotManager.checkConsecutiveDaysForWorkoutTypes(slot, lowIntensityWorkoutTypesData.highIntensityWorkoutTypes)
        ) {
          // if they have, check if current workout is low intensity
          if (lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes.includes(currentWorkout.type)) {
            // if it is low intensity, then we can schedule
            lowIntensityBeingScheduled = true;
          } else {
            // if not, then rule violated - look for another available slot
            continue;
          }
        }

        // determine if we can add optional workouts (if any)
        // check if workoutType has any optional combinations and sort by priority
        const optionalCombinations = await this.prisma.workoutTypesCombinations.findMany({
          where: {
            status: WORKOUT_COMBINATION_STATUS.Optional,
            combinationRulesWorkoutTypes: {
              workoutType: currentWorkout.type,
              combinationRules: {
                planId: originalPlan.id,
              },
            },
          },
          include: {
            combinationRulesWorkoutTypes: {
              select: {
                workoutType: true,
              },
            },
          },
          orderBy: {
            priority: 'asc',
          },
        });

        // check if any of the optional workouts can be scheduled
        // for all optional combination rules
        for (const optionalCombination of optionalCombinations) {
          // for all optional combination workout types for this rule (its multiselect)
          for (const optionalCombinationWorkoutType of optionalCombination.combinationWorkoutTypes) {
            let optionalPriorityCombinationAssigned = false;
            // find all of the workouts of the workout type
            let optionalCombinationWorkouts = isInjured
              ? await this.findInjuryWorkoutByType(optionalCombinationWorkoutType)
              : slot.holidayMode
              ? await this.findHolidayWorkoutByType(optionalCombinationWorkoutType)
              : await this.findWorkoutsByType(optionalCombinationWorkoutType);

            // get normal workouts if no holiday workouts are available
            if (slot.holidayMode && optionalCombinationWorkouts.length <= 0 && !isInjured)
              optionalCombinationWorkouts = await this.findWorkoutsByType(optionalCombinationWorkoutType);

            // for all workouts, check if any fit
            for (const optionalCombinationWorkout of optionalCombinationWorkouts) {
              if (slot.duration >= currentWorkoutDuration + optionalCombinationWorkout.durationSeconds) {
                optionalCombination.allocation === WORKOUT_COMBINATION_BEFORE_AFTER.Before
                  ? optionalWorkoutsBefore.push(optionalCombinationWorkout)
                  : optionalWorkoutsAfter.push(optionalCombinationWorkout);

                currentWorkoutDuration += optionalCombinationWorkout.durationSeconds;
                optionalPriorityCombinationAssigned = true;
                break;
              }
            }

            // if we've found a workout for this priority optional combination,
            // break and go to next priority
            if (optionalPriorityCombinationAssigned) {
              break;
            }
          }
        }

        try {
          // Make sure the other slot in the same day is unavailable if low intensity workout is being scheduled
          if (lowIntensityBeingScheduled) {
            const otherSlot =
              slot.sequence % 2 === 0
                ? slotManager.findSlotBySequence(slot.sequence - 1)
                : slotManager.findSlotBySequence(slot.sequence + 1);
            otherSlot.isAvailable = false;
          }

          // create and populate gym session with workout and mandatory and optional combinations
          await this.createAndPopulateGymSession(
            existingPlanSchedules[0],
            userPlan.planId,
            slot.session,
            slot.day,
            [
              ...mandatorWorkoutsBefore,
              ...optionalWorkoutsBefore,
              currentWorkout,
              ...mandatorWorkoutsAfter,
              ...optionalWorkoutsAfter,
            ],
            onPeriod,
            originalPlan.alternativeExerciseRules,
            slot.unavailableExercises,
          );
        } catch (error) {
          console.log('error: ', error);
        }

        try {
          // add all assigned workout types to the slot

          // TODO: Remove this later, only here for debugging
          for (const workoutAdded of [
            ...mandatorWorkoutsBefore.map((w) => ({ ...w, source: 'mandatorWorkoutsBefore' })),
            ...optionalWorkoutsBefore.map((w) => ({ ...w, source: 'optionalWorkoutsBefore' })),
            { ...currentWorkout, source: 'currentWorkout' },
            ...mandatorWorkoutsAfter.map((w) => ({ ...w, source: 'mandatorWorkoutsAfter' })),
            ...optionalWorkoutsAfter.map((w) => ({ ...w, source: 'optionalWorkoutsAfter' })),
          ]) {
            slotManager.assignWorkoutTypes(slot.day, slot.session, workoutAdded.type);
            // Log differently based on the source
            switch (workoutAdded.source) {
              case 'mandatorWorkoutsBefore':
                console.log(
                  `Assigned mandatory workout (before) with name ${workoutAdded.name} of type ${workoutAdded.type} to slot ${slot.day} ${slot.session}`,
                );
                break;
              case 'optionalWorkoutsBefore':
                console.log(
                  `Assigned optional workout (before) with name ${workoutAdded.name} of type ${workoutAdded.type} to slot ${slot.day} ${slot.session}`,
                );
                break;
              case 'currentWorkout':
                console.log(
                  `Assigned current workout with name ${workoutAdded.name} of type ${workoutAdded.type} to slot ${slot.day} ${slot.session}`,
                );
                break;
              case 'mandatorWorkoutsAfter':
                console.log(
                  `Assigned mandatory workout (after) with name ${workoutAdded.name} of type ${workoutAdded.type} to slot ${slot.day} ${slot.session}`,
                );
                break;
              case 'optionalWorkoutsAfter':
                console.log(
                  `Assigned optional workout (after) with name ${workoutAdded.name} of type ${workoutAdded.type} to slot ${slot.day} ${slot.session}`,
                );
                break;
              default:
                console.log(
                  `Assigned workout ${workoutAdded.name} of type ${workoutAdded.type} to slot ${slot.day} ${slot.session}`,
                );
                break;
            }
          }

          // update the duration of the slot and make unavailable
          slot.duration = slot.duration - currentWorkoutDuration;
          slot.isAvailable = false;
        } catch (error) {
          console.log('error: ', error);
        }

        // we're done with scheduling if there are no more available slots
        if (slotManager.getAvailableSlots().length === 0) {
          return true;
        }

        // if here, we've found a slot, break and go to next workout
        break;
      }
    }

    return false;
  }

  async newPlanHelper(
    // TODO: move to types file
    athlete: Prisma.UserGetPayload<{
      include: {
        preferences: {
          include: {
            menstrualCycle: true;
          };
        };
        injury: true;
      };
    }>,
    workoutTypeRules: Prisma.WorkoutTypeRulesGetPayload<{
      include: {
        workoutPriorityOccurrence: true;
      };
    }>,
    userWorkoutSettings: Prisma.WorkoutSettingGetPayload<{
      include: {
        weekDaySettings: {
          include: {
            WeekDayExercises: true;
          };
        };
      };
    }>,
    userPlan: UserPlan,
    originalPlan: Prisma.PlanGetPayload<{
      include: {
        alternativeExerciseRules: true;
      };
    }>,
    existingPlanSchedules: PlanSchedule[],
    weekToSchedule: number,
  ) {
    const slotManager = new SlotManager();
    const slotManagerPreviousWeek = new SlotManager();
    // in case all available slots are filled before going through all types
    let schedulingDone = false;
    let onPeriod = false;
    let isInjured = false;

    // Have to iterate single workoutType on top priority for the whole week then move to next one
    const workoutPriorityOccurrence = workoutTypeRules.workoutPriorityOccurrence;

    // Get rest days (2.1)
    const restDays = await this.prisma.restDayRules.findFirst({
      where: {
        planId: originalPlan.id,
      },
    });

    // initialize slots for the week
    for (const settings of userWorkoutSettings.weekDaySettings) {
      const day = settings.day;
      const session = settings.session;
      const duration = settings.morningTimeSeconds ? settings.morningTimeSeconds : settings.eveningTimeSeconds;
      const holidayMode = settings.holidayMode;

      slotManager.makeAvailableByDayAndSession(
        day,
        session,
        true,
        duration,
        holidayMode,
        null,
        settings.WeekDayExercises,
      );
    }

    // initialize slots for the previous week if it exists
    if (existingPlanSchedules && existingPlanSchedules.length > 0) {
      for (const existingPlanSchedule of existingPlanSchedules) {
        // get all scheduled workouts for the previous week
        const workouts = await this.prisma.scheduleWorkout.findMany({
          where: {
            planScheduleId: existingPlanSchedule.id,
          },
          include: {
            workout: true,
          },
        });
        slotManagerPreviousWeek.makeAvailableByDayAndSession(
          existingPlanSchedule.day,
          existingPlanSchedule.gymSession,
          false,
          0,
          false,
          // add all the workouts types to the slot manager
          workouts.map((workout) => workout.workout.type),
        );
      }
    }

    // loop through the workout types
    for (const workoutPriorityType of workoutPriorityOccurrence) {
      // skip if there are no occurrences in the settings
      if (workoutPriorityType.occurrence === 0) continue;

      // check if athlete is on their period
      if (athlete.preferences.gender === GENDER.Female && athlete.preferences.useCalendar === true) {
        const menstrualCycle = athlete.preferences.menstrualCycle;

        // check if the athlete is on their period
        onPeriod = await this.willBeOnPeriod(
          athlete.preferences.periodDuration,
          athlete.preferences.cycleDuration,
          menstrualCycle[0].date,
          weekToSchedule,
          userPlan,
        );

        if (onPeriod) {
          // if it is a cardio interval run, swap for cardio threshold run
          if (workoutPriorityType.workoutType === WORKOUT_TYPE.CardioIntervalRun) {
            workoutPriorityType.workoutType = WORKOUT_TYPE.CardioThresholdRun;
          }
        }
      }

      // keep track of the number of workouts assigned for this type
      let workoutsAssignedForType = 0;

      // Check if athlete is injured
      if (
        athlete.injury.achillesTendon ||
        athlete.injury.ankle ||
        athlete.injury.back ||
        athlete.injury.hip ||
        athlete.injury.knee ||
        athlete.injury.shoulder
      ) {
        isInjured = true;
      }

      // find all the workouts of this type, order by duration
      const workouts = isInjured
        ? await this.findInjuryWorkoutByType(workoutPriorityType.workoutType)
        : await this.findWorkoutsByType(workoutPriorityType.workoutType);

      // check if workoutType has any mandatory combinations
      const mandatoryCombinations = await this.prisma.workoutTypesCombinations.findMany({
        where: {
          status: WORKOUT_COMBINATION_STATUS.Mandatory,
          combinationRulesWorkoutTypes: {
            workoutType: workoutPriorityType.workoutType,
            combinationRules: {
              planId: originalPlan.id,
            },
          },
        },
        include: {
          combinationRulesWorkoutTypes: {
            select: {
              workoutType: true,
            },
          },
        },
      });

      // check if any of the workouts can be scheduled
      for (const workout of workouts) {
        let workoutExcluded = false;
        // check if athlete is in exclusion list of this workout and skip if so
        for (const excludedAthlete of workout.excludedAthletesWorkout) {
          if (excludedAthlete.userId === athlete.id) {
            workoutExcluded = true;
            break;
          }
        }

        if (workoutExcluded) continue;

        const workoutDuration = workout.durationSeconds;

        schedulingDone = await this.findValidSlot(
          slotManager,
          slotManagerPreviousWeek,
          workout,
          originalPlan,
          userPlan,
          workoutDuration,
          existingPlanSchedules,
          restDays.days,
          onPeriod,
          isInjured,
          mandatoryCombinations.length > 0 ? mandatoryCombinations : undefined,
        );

        // we're done with scheduling if there are no more available slots
        if (schedulingDone) {
          return;
        }

        workoutsAssignedForType++;

        // if we've reached the total occurrences for this type, break
        if (workoutsAssignedForType === workoutPriorityType.occurrence) {
          break;
        }
      }
    }
  }

  // week is optional, mainly for testing purposes. If not provided, it will be the next week
  async update(athleteId: string): Promise<ResponseDto> {
    try {
      // const athleteRole = await this.prisma.role.findUnique({
      //   where: {
      //     title: ROLE_TITLE.ATHLETE,
      //   },
      // });

      // fetch user by id
      const athlete = await this.prisma.user.findUnique({
        where: {
          id: athleteId,
        },
        include: {
          preferences: {
            include: {
              menstrualCycle: true,
            },
          },
          injury: true,
        },
      });

      if (!athlete) {
        throw new NotFoundException('Athlete not found!');
      }

      // get the plan for the user
      const userPlan = await this.prisma.userPlan.findFirst({
        where: {
          current: true,
          userId: athlete.id,
          plan: {
            type: {
              not: 'fixed',
            },
          },
        },
        include: {
          plan: true, // This includes the related Plan object in the result
        },
      });

      if (userPlan) {
        //Extract Plan - superset id is for identifying clones
        const planSuperSetId = userPlan.plan.planSuperSetId;
        const originalPlan = await this.prisma.plan.findFirst({
          where: {
            planSuperSetId,
            userClone: false,
          },
          include: {
            alternativeExerciseRules: true,
          },
        });

        // Get user workoutSettings, including ones for each weekday
        const userWorkoutSettings = await this.prisma.workoutSetting.findUnique({
          where: {
            userId: athlete.id,
          },
          include: {
            weekDaySettings: {
              include: {
                WeekDayExercises: {
                  include: {
                    exercise: true,
                  },
                },
              },
            },
          },
        });
        let raceDayCheck = false;
        let raceSimulationCheck = false;

        // find all the existing schedules for the latest week
        const maxWeek = await this.prisma.planSchedule.aggregate({
          _max: {
            week: true,
          },
          where: {
            planId: userPlan.planId,
          },
        });

        // Extract the maximum week value
        const highestWeek = maxWeek?._max?.week;

        // Find all planSchedules with the highest week value
        const existingPlanSchedules = await this.prisma.planSchedule.findMany({
          where: {
            planId: userPlan.planId,
            week: highestWeek ?? 1,
          },
        });

        if (userWorkoutSettings) {
          // 1.1, 1.2 Race Logic
          if (userWorkoutSettings.raceDay) {
            raceDayCheck = await this.handleRaceDay(
              new Date(userWorkoutSettings.raceDay),
              RACE_RULE_TYPE.Race,
              originalPlan,
              userPlan,
              existingPlanSchedules,
              existingPlanSchedules && existingPlanSchedules.length > 0 ? existingPlanSchedules[0].week + 1 : 1,
            );
          }

          if (userWorkoutSettings.raceDaySimulation && !raceDayCheck) {
            raceSimulationCheck = await this.handleRaceDay(
              new Date(userWorkoutSettings.raceDaySimulation),
              RACE_RULE_TYPE.RaceSimulation,
              originalPlan,
              userPlan,
              existingPlanSchedules,
              existingPlanSchedules && existingPlanSchedules.length > 0 ? existingPlanSchedules[0].week + 1 : 1,
            );
          }

          // all other cases if no race day or simulation in the current week
          if (!raceDayCheck && !raceSimulationCheck) {
            // first get the workoutSettings and check the available days of athlete
            // Initialize a Map to store occurrences of each day. Each day may have 2 occurrences
            // one for the morning and one for the evening
            const dayOccurrences = new Map<DAY, number>();

            for (const weekDaySetting of userWorkoutSettings.weekDaySettings) {
              // Update the count for the current day
              dayOccurrences.set(weekDaySetting.day, (dayOccurrences.get(weekDaySetting.day) || 0) + 1);
            }

            // To get the count of unique days
            const uniqueDaysCount = dayOccurrences.size;

            let workoutTypeRules;

            const dayMapping = {
              1: WORKOUT_TYPE_DAYS.OneDay,
              2: WORKOUT_TYPE_DAYS.TwoDay,
              3: WORKOUT_TYPE_DAYS.ThreeDay,
              4: WORKOUT_TYPE_DAYS.FourDay,
              5: WORKOUT_TYPE_DAYS.FiveDay,
              6: WORKOUT_TYPE_DAYS.SixDay,
              7: WORKOUT_TYPE_DAYS.SevenDay,
            };

            // for each case of unique days, get the workoutTypeRules of the plan for the day
            if (uniqueDaysCount >= 1 && uniqueDaysCount <= 7) {
              workoutTypeRules = await this.prisma.workoutTypeRules.findFirst({
                where: {
                  day: dayMapping[uniqueDaysCount],
                  planId: originalPlan.id,
                },
                include: {
                  workoutPriorityOccurrence: {
                    orderBy: {
                      priority: 'asc',
                    },
                  },
                },
              });

              await this.newPlanHelper(
                athlete,
                workoutTypeRules,
                userWorkoutSettings,
                userPlan,
                originalPlan,
                existingPlanSchedules,
                existingPlanSchedules && existingPlanSchedules.length > 0 ? existingPlanSchedules[0].week + 1 : 1,
              );
            }
          }
        }
      } else {
        throw new NotFoundException('Athlete Plan not found!');
      }

      return {
        message: 'Successfully executed algorithm',
        data: 'Successfully executed algorithm',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(athleteId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: athleteId,
        },
      });
      if (!user) {
        throw new NotFoundException('Athete not found!');
      }
      const userPlan = await this.prisma.userPlan.findFirst({
        where: {
          current: true,
          userId: athleteId,
          plan: {
            type: {
              not: 'fixed',
            },
          },
        },
        include: {
          plan: true, // This includes the related Plan object in the result
        },
      });

      if (userPlan) {
        await this.prisma.planSchedule.deleteMany({
          where: {
            planId: userPlan.planId,
          },
        });
      } else {
        throw new NotFoundException('Athlete Plan not found!');
      }

      return {
        message: 'Successfully deleted athlete schedules',
        data: 'Successfully deleted athlete schedules',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getStartOfWeek(week: number, userPlan: UserPlan) {
    const startDateOfWeek = startOfWeek(addWeeks(userPlan.createdAt, week), { weekStartsOn: 1 });

    return startDateOfWeek;
  }

  // Helper functions
  async handleRaceDay(
    raceDay: Date,
    raceRuleType: RACE_RULE_TYPE,
    originalPlan: Plan,
    userPlan: UserPlan,
    existingPlanSchedules: PlanSchedule[],
    weekToSchedule: number,
  ) {
    const startOfNextWeekDate = await this.getStartOfWeek(weekToSchedule, userPlan);
    const endOfNextWeekDate = endOfWeek(startOfNextWeekDate, { weekStartsOn: 1 });
    let raceCheck = false;

    if (raceDay >= startOfNextWeekDate && raceDay <= endOfNextWeekDate) {
      raceCheck = true;

      // convert raceDay to WEEK_DAY
      const raceWeekDay = raceDay.getDay() === 5 ? DAY.Friday : raceDay.getDay() === 6 ? DAY.Saturday : DAY.Sunday;

      console.log(`${raceRuleType} day is in the next week. ${raceDay}`);

      const raceRules = await this.prisma.raceRules.findMany({
        where: { planId: originalPlan.id, type: raceRuleType, raceDay: raceWeekDay },
        include: { workout: true },
      });

      // Loop through the rule for each day
      for (const raceRule of raceRules) {
        //create planSchedule - this is essentially a gym session
        if (raceRule.workoutId) {
          // get the workout from the race rule
          const workout = await this.prisma.workout.findUnique({
            where: { id: raceRule.workoutId },
            include: {
              WorkoutParts: {
                include: {
                  comments: true,
                  breaks: true,
                  generatedExercises: true,
                  partExercises: { include: { exercise: true } },
                },
              },
              excludedAthletesWorkout: true,
            },
          });

          // create the gym session
          await this.createAndPopulateGymSession(
            existingPlanSchedules[0],
            userPlan.planId,
            raceRule.gymSession,
            raceRule.weekDay,
            [workout],
          );
        }
      }
    }
    return raceCheck;
  }

  // TODO: implement alternative exercise check
  async checkAlternativeExercise(
    exerciseId: string,
    unavailableExercises: WeekDayExercises[],
    planAlternateExerciseSettings: AlternativeExerciseRules[],
  ): Promise<string> {
    if (!unavailableExercises) return exerciseId;

    // check if exercise is unavailable
    const unavailableExercise = unavailableExercises.find((exercise) => exercise.exerciseId === exerciseId);
    // if unavailable, return the alternative exercise from the exercise rules
    if (unavailableExercise) {
      const alternativeExerciseRule = planAlternateExerciseSettings.find(
        (rule) => rule.exerciseId === exerciseId && rule.alternativeExerciseId,
      );
      if (alternativeExerciseRule) return alternativeExerciseRule?.alternativeExerciseId;
    }

    // if available, return the exercise id
    return exerciseId;
  }

  async createAndPopulateGymSession(
    existingPlanSchedule: PlanSchedule,
    userPlanId: string,
    gymSession: GYM_SESSION,
    day: DAY,
    workouts: WorkoutWithDetails[],
    onPeriod = false,
    alternativeExerciseRules?: AlternativeExerciseRules[],
    unavailableExercises?: WeekDayExercises[],
  ) {
    const currentScheduleWeek = existingPlanSchedule ? existingPlanSchedule.week + 1 : 1;

    // check if gym session exists
    let currentPlanSchedule = await this.prisma.planSchedule.findFirst({
      where: {
        planId: userPlanId,
        week: currentScheduleWeek,
        day: day,
        gymSession: gymSession,
      },
    });

    try {
      // do this in a transaction to ensure that all operations are atomic
      await this.prisma.$transaction(
        async (prisma) => {
          if (!currentPlanSchedule) {
            // create the gym session if it doesn't exist
            currentPlanSchedule = await prisma.planSchedule.create({
              data: {
                week: currentScheduleWeek,
                userClone: true,
                planId: userPlanId,
                gymSession: gymSession,
                day: day,
              },
            });
          }

          // clone and assign workouts
          for (const workout of workouts) {
            // Prepare the data for cloning
            const clonedWorkoutData = {
              name: workout.name,
              type: workout.type,
              generated: workout.generated,
              duration: workout.duration,
              relatedInjuries: workout.relatedInjuries,
              injuries: workout.injuries,
              mediaUrl: workout.mediaUrl,
              holidayMode: workout.holidayMode,
              userClone: true,
              workoutSuperSetId: workout.workoutSuperSetId,
              WorkoutParts: {
                create: await Promise.all(
                  workout?.WorkoutParts?.map(async (workoutPart) => ({
                    userClone: true,
                    name: workoutPart.name,
                    position: workoutPart.position,
                    comments: {
                      create: workoutPart?.comments?.map((comment) => ({
                        userClone: true,
                        position: comment.position,
                        comment: comment.comment,
                      })),
                    },
                    breaks: {
                      create: workoutPart?.breaks?.map((breakItem) => ({
                        userClone: true,
                        position: breakItem.position,
                        break: breakItem.break,
                      })),
                    },
                    partExercises: {
                      create: [
                        ...(await Promise.all(
                          workoutPart?.partExercises?.map(async (partExercise) => ({
                            userClone: true,
                            benchmark: partExercise.benchmark,
                            // 75% intensity if on period. Right now value is in a string with % sign
                            intensity: onPeriod
                              ? (parseFloat(partExercise.intensity) * 0.75).toString() + '%'
                              : partExercise.intensity,
                            position: partExercise.position,
                            fieldOne: partExercise.fieldOne,
                            fieldTwo: partExercise.fieldTwo,
                            reps: partExercise.reps,
                            sets: partExercise.sets,
                            exercise: {
                              connect: {
                                id: await this.checkAlternativeExercise(
                                  partExercise.exercise?.id,
                                  unavailableExercises,
                                  alternativeExerciseRules,
                                ),
                              },
                            },
                          })),
                        )),
                        ...(
                          await Promise.all(
                            workoutPart.generatedExercises?.map(async (generatedExercise) => {
                              // for each generated exercise, find all exercises with the same muscle group and exercise type
                              const selectedExercises = await this.prisma.exercise.findMany({
                                where: {
                                  muscleGroup: generatedExercise.muscleGroup,
                                  exerciseType: generatedExercise.exerciseType,
                                },
                              });

                              // select one of the exercises randomly
                              const randomExercise =
                                selectedExercises[Math.floor(Math.random() * selectedExercises.length)];

                              if (randomExercise) {
                                return {
                                  userClone: true,
                                  benchmark: generatedExercise.benchmark,
                                  // 75% intensity if on period. Right now value is in a string with % sign
                                  intensity: onPeriod
                                    ? (parseFloat(generatedExercise.intensity) * 0.75).toString() + '%'
                                    : generatedExercise.intensity,
                                  position: generatedExercise.position,
                                  fieldOne: generatedExercise.fieldOne,
                                  fieldTwo: generatedExercise.fieldTwo,
                                  reps: generatedExercise.reps,
                                  sets: generatedExercise.sets,
                                  exercise: {
                                    connect: {
                                      id: await this.checkAlternativeExercise(
                                        randomExercise.id,
                                        unavailableExercises,
                                        alternativeExerciseRules,
                                      ),
                                    },
                                  },
                                };
                              } else return null;
                            }),
                          )
                        ).filter((exercise) => exercise !== null), // Filter out null values,
                      ],
                    },
                  })),
                ),
              },
            };

            // Clone the workout
            const newWorkout = await prisma.workout.create({
              data: clonedWorkoutData,
            });

            // Assign the workout to the gym session
            await prisma.scheduleWorkout.create({
              data: {
                userClone: true,
                planScheduleId: currentPlanSchedule.id,
                workoutId: newWorkout.id,
              },
            });
          }
        },
        { maxWait: 5000, timeout: 10000 },
      );
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
