import { DAY, GYM_SESSION, WeekDayExercises, WORKOUT_TYPE } from '@prisma/client';

export interface Slot {
  sequence: number; // 1-14 for the sequence
  day: DAY;
  session: GYM_SESSION;
  duration?: number; // Duration in minutes
  isAvailable: boolean;
  workoutTypesAssigned?: WORKOUT_TYPE[];
  holidayMode?: boolean;
  unavailableExercises?: WeekDayExercises[];
}

export class SlotManager {
  private slots: Slot[] = [];
  private availabilityMap = new Map<number, Slot>(); // Map sequence number to Slot

  private dayOrder = [DAY.Monday, DAY.Tuesday, DAY.Wednesday, DAY.Thursday, DAY.Friday, DAY.Saturday, DAY.Sunday];

  constructor(slots?: Slot[]) {
    // Initialize the slots in order
    this.slots = slots ?? [
      { sequence: 1, day: DAY.Monday, session: GYM_SESSION.Morning, isAvailable: false },
      { sequence: 2, day: DAY.Monday, session: GYM_SESSION.Evening, isAvailable: false },
      { sequence: 3, day: DAY.Tuesday, session: GYM_SESSION.Morning, isAvailable: false },
      { sequence: 4, day: DAY.Tuesday, session: GYM_SESSION.Evening, isAvailable: false },
      { sequence: 5, day: DAY.Wednesday, session: GYM_SESSION.Morning, isAvailable: false },
      { sequence: 6, day: DAY.Wednesday, session: GYM_SESSION.Evening, isAvailable: false },
      { sequence: 7, day: DAY.Thursday, session: GYM_SESSION.Morning, isAvailable: false },
      { sequence: 8, day: DAY.Thursday, session: GYM_SESSION.Evening, isAvailable: false },
      { sequence: 9, day: DAY.Friday, session: GYM_SESSION.Morning, isAvailable: false },
      { sequence: 10, day: DAY.Friday, session: GYM_SESSION.Evening, isAvailable: false },
      { sequence: 11, day: DAY.Saturday, session: GYM_SESSION.Morning, isAvailable: false },
      { sequence: 12, day: DAY.Saturday, session: GYM_SESSION.Evening, isAvailable: false },
      { sequence: 13, day: DAY.Sunday, session: GYM_SESSION.Morning, isAvailable: false },
      { sequence: 14, day: DAY.Sunday, session: GYM_SESSION.Evening, isAvailable: false },
    ];

    // Populate the map for easy lookup and modification
    for (const slot of this.slots) {
      this.availabilityMap.set(slot.sequence, slot);
    }
  }

  findSlotBySequence(sequence: number): Slot | undefined {
    return this.availabilityMap.get(sequence);
  }

  // Method to find a slot by day and session
  findSlot(day: DAY, session: GYM_SESSION): Slot | undefined {
    return this.slots.find((slot) => slot.day === day && slot.session === session);
  }

  // Method to check availability for a given sequence sessionRange - used in break rules
  checkAssignedWorkoutTypes(
    sessionRange: number,
    workoutTypesToCheck: WORKOUT_TYPE[],
    currentSession: number,
    previousWeekSlots?: SlotManager,
  ): boolean {
    // Check sequences after currentSession
    for (let i = currentSession + 1; i <= sessionRange + currentSession; i++) {
      if (i > 0 && i <= this.slots.length) {
        const slot = this.availabilityMap.get(i);
        if (slot) {
          for (const workoutType of workoutTypesToCheck) {
            if (slot.workoutTypesAssigned?.includes(workoutType)) {
              return true;
            }
          }
        }
      }
    }

    // Check sequences before currentSession
    for (let i = currentSession - sessionRange; i < currentSession; i++) {
      if (i > 0 && i <= this.slots.length) {
        const slot = this.availabilityMap.get(i);
        if (slot) {
          for (const workoutType of workoutTypesToCheck) {
            if (slot.workoutTypesAssigned?.includes(workoutType)) {
              return true;
            }
          }
        }
      }
    }
    // Check in past week if required
    if (currentSession - sessionRange <= 0 && previousWeekSlots && previousWeekSlots.slots.length > 0) {
      for (
        let i = previousWeekSlots.slots.length + (currentSession - sessionRange);
        i <= previousWeekSlots.slots.length;
        i++
      ) {
        if (i > 0 && i <= previousWeekSlots.slots.length) {
          const slot = previousWeekSlots.availabilityMap.get(i);
          if (slot) {
            for (const workoutType of workoutTypesToCheck) {
              if (slot.workoutTypesAssigned?.includes(workoutType)) {
                return true;
              }
            }
          }
        }
      }
    }

    return false;
  }

  // Method to find the previous slots up to a given count
  findPreviousSlots(currentSequence: number, count: number, previousWeekSlots?: SlotManager): Slot[] {
    let previousSlots: Slot[] = [];
    const startSequence = Math.max(currentSequence - count, 1);
    const thisWeekSlots = this.slots.slice(startSequence - 1, currentSequence - 1);

    // determine if we need to get slots from the previous week
    if (currentSequence - count <= 1 && previousWeekSlots && previousWeekSlots.slots.length > 0) {
      const previousWeekStartSequence = previousWeekSlots.slots.length + (currentSequence - count);
      previousSlots = previousWeekSlots.slots.slice(previousWeekStartSequence - 1, 14);
      //   return previousWeekSlots.slots.slice(previousWeekSlots.slots.length - previousWeekCount);
    }

    return [...previousSlots, ...thisWeekSlots];
  }

  // Utility function to find the next slots up to a given count
  findNextSlots(currentSequence: number, count: number): Slot[] {
    const endSequence = Math.min(currentSequence + count, this.slots.length);
    return this.slots.slice(currentSequence, endSequence);
  }

  checkRestDay(restDays: number, currentSession: number, previousWeekSlots?: SlotManager): boolean {
    // if the other session in the day has a workout assigned, return false
    const sequenceToCheck = this.findSlotBySequence(currentSession % 2 === 0 ? currentSession - 1 : currentSession + 1);
    if (sequenceToCheck?.workoutTypesAssigned?.length > 0) {
      return false;
    }

    // determine how many slots to check
    // if evening session, move one slot back to morning session
    const previousSlots = this.findPreviousSlots(
      currentSession % 2 === 0 ? currentSession - 1 : currentSession,
      restDays * 2,
      previousWeekSlots,
    );

    // for next slots, skip the current day's sessions
    const nextSlots = this.findNextSlots(currentSession % 2 === 0 ? currentSession : currentSession + 1, restDays * 2);

    // Helper function to check if all required days have workouts assigned
    const allDaysHaveWorkouts = (slots: Slot[]): boolean => {
      const daysWithWorkouts = new Set<DAY>();

      for (const slot of slots) {
        if (slot.workoutTypesAssigned && slot.workoutTypesAssigned.length > 0) {
          daysWithWorkouts.add(slot.day);
        }
      }

      // We expect all days in this period to have workouts
      return daysWithWorkouts.size === restDays;
    };

    // Check if all days before the current session have workouts assigned
    const allBeforeHaveWorkouts = allDaysHaveWorkouts(previousSlots);

    // Check if all days after the current session have workouts assigned
    const allAfterHaveWorkouts = allDaysHaveWorkouts(nextSlots);

    // Return true if either all days before or after have assigned workouts
    return allBeforeHaveWorkouts || allAfterHaveWorkouts;
  }

  // Method to check if any workouts from workoutsToCheck exist in previous 2 consecutive days
  checkConsecutiveDaysForWorkoutTypes(currentSlot: Slot, workoutsToCheck: WORKOUT_TYPE[]): boolean {
    const slotsToCheck = currentSlot.session === GYM_SESSION.Evening ? 5 : 4;
    const previousSlots = this.findPreviousSlots(currentSlot.sequence, slotsToCheck);

    if (!previousSlots.length) return false;

    const daysWithMatchingWorkouts = new Set<DAY>();

    for (const slot of previousSlots) {
      if (slot.workoutTypesAssigned) {
        for (const assignedWorkout of slot.workoutTypesAssigned) {
          if (workoutsToCheck.includes(assignedWorkout)) {
            daysWithMatchingWorkouts.add(slot.day);
          }
        }
      }
    }

    // Sort days according to their order in the week
    const matchingDays = Array.from(daysWithMatchingWorkouts).sort(
      (a, b) => this.dayOrder.indexOf(a) - this.dayOrder.indexOf(b),
    );

    // Check for consecutive days with matching workouts
    for (let i = 0; i < matchingDays.length - 1; i++) {
      const currentDayIndex = this.dayOrder.indexOf(matchingDays[i]);
      const nextDayIndex = this.dayOrder.indexOf(matchingDays[i + 1]);

      if (nextDayIndex === currentDayIndex + 1) {
        return true; // Found two consecutive days with matching workouts
      }
    }

    return false; // No consecutive days with matching workouts found
  }

  makeAvailableBySequence(sequence: number, duration?: number) {
    const slot = this.findSlotBySequence(sequence);
    if (slot) {
      slot.isAvailable = true;
      slot.duration = duration;
    } else {
      console.log(`Slot not found for sequence ${sequence}`);
    }
  }

  // Method to make a slot available based on day and session
  makeAvailableByDayAndSession(
    day: DAY,
    session: GYM_SESSION,
    isAvailable: boolean,
    duration?: number,
    holidayMode?: boolean,
    workoutTypes?: WORKOUT_TYPE[],
    unavailableExercises?: WeekDayExercises[],
  ) {
    const slot = this.findSlot(day, session);
    if (slot) {
      slot.isAvailable = isAvailable;
      slot.duration = duration;
      slot.holidayMode = holidayMode;
      if (workoutTypes) slot.workoutTypesAssigned = [...workoutTypes];
      if (unavailableExercises) slot.unavailableExercises = [...unavailableExercises];
    } else {
      console.log(`Slot not found for ${day} ${session}`);
    }
  }

  // Method to make a slot unavailable based on day and session
  makeUnavailableByDayAndSession(day: DAY, session: GYM_SESSION) {
    const slot = this.findSlot(day, session);
    if (slot) {
      slot.isAvailable = false;
    } else {
      console.log(`Slot not found for ${day} ${session}`);
    }
  }

  // Method to get all available slots
  getAvailableSlots(): Slot[] {
    return this.slots.filter((slot) => slot.isAvailable);
  }

  // Method to get all slots (available and unavailable)
  getAllSlots(): Slot[] {
    return this.slots;
  }

  // Method to toggle availability of a slot based on day and session
  toggleSlotAvailabilityByDayAndSession(day: DAY, session: GYM_SESSION) {
    const slot = this.findSlot(day, session);
    if (slot) {
      slot.isAvailable = !slot.isAvailable;
    } else {
      console.log(`Slot not found for ${day} ${session}`);
    }
  }

  // Method to assign workout types to a slot
  assignWorkoutTypes(day: DAY, session: GYM_SESSION, workoutType: WORKOUT_TYPE) {
    const slot = this.findSlot(day, session);
    if (slot) {
      // Ensure workoutTypesAssigned is initialized
      if (!slot.workoutTypesAssigned) {
        slot.workoutTypesAssigned = [];
      }

      // Add only unique workout types
      if (!slot.workoutTypesAssigned.includes(workoutType)) {
        slot.workoutTypesAssigned.push(workoutType);
      }
    } else {
      console.log(`Slot not found for ${day} ${session}`);
    }
  }

  // Method to print slots (for debugging)
  printSlots() {
    console.log('Available Slots:');
    for (const slot of this.getAvailableSlots()) {
      console.log(`Sequence: ${slot.sequence}, Day: ${slot.day}, Session: ${slot.session}`);
    }

    console.log('\nAll Slots:');
    for (const slot of this.getAllSlots()) {
      console.log(
        `Sequence: ${slot.sequence}, Day: ${slot.day}, Session: ${slot.session}, Available: ${slot.isAvailable}`,
      );
    }
  }
}
