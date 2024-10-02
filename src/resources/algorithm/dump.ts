// } else if (weekDaySetting.day === DAY.Tuesday) {
//     //check restDay rules
//     if (this.countConsecutiveNonZeroDays(daysOfWeek, DAY.Tuesday) !== restDays) {
//       if (weekDaySetting.session === GYM_SESSION.Morning) {
//         const exist = await this.prisma.planSchedule.findUnique({
//           where: {
//             week_day_gymSession_planId: {
//               week: 1,
//               planId: userPlan.planId,
//               gymSession: GYM_SESSION.Morning,
//               day: DAY.Tuesday,
//             },
//           },
//           include: {
//             scheduleWorkouts: {
//               include: {
//                 workout: true,
//               },
//             },
//           },
//         });

//         if (!exist) {
//           //check break rules
//           const breakRules = await this.prisma.breakRules.findMany({
//             where: {
//               planId: originalPlan.id,
//               workoutType,
//             },
//           });

//           let twoDayBefore = true;
//           let oneHalfDayBefore = true;
//           let oneDayBefore = true;
//           let oneDayAfter = true;
//           let oneHalfDayAfter = true;
//           let twoDayAfter = true;

//           for (const breakRule of breakRules) {
//             if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayBefore) {
//               //Monday 1.5 ===> Sat Evening
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const monMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Monday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const monEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Monday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const monMorningWorkoutTypes: string[] = [];
//               const monEveningWorkoutTypes: string[] = [];

//               if (monMorning) {
//                 for (const scheduleWorkout of monMorning?.scheduleWorkouts) {
//                   monMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (monEvening) {
//                 for (const scheduleWorkout of monEvening?.scheduleWorkouts) {
//                   monEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) => monMorningWorkoutTypes.includes(type) || monEveningWorkoutTypes.includes(type),
//               );

//               if (!isWorkoutTypeInSchedule) {
//                 oneHalfDayBefore = true;
//                 //means no break
//               } else {
//                 oneHalfDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneDayBefore) {
//               //Monday 1 ===> Sun Morning

//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const monEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Monday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const monEveningWorkoutTypes: string[] = [];

//               if (monEvening) {
//                 for (const scheduleWorkout of monEvening?.scheduleWorkouts) {
//                   monEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 monEveningWorkoutTypes.includes(type),
//               );

//               if (!isWorkoutTypeInSchedule) {
//                 oneDayBefore = true;
//                 //means no break
//               } else {
//                 oneDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.TwoDayAfter) {
//               //Monday 2 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const tueEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Tuesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Wednesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Wednesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedMorningWorkoutTypes: string[] = [];
//               const tueEveningWorkoutTypes: string[] = [];
//               const wedEveningWorkoutTypes: string[] = [];
//               if (wedMorning) {
//                 for (const scheduleWorkout of wedMorning?.scheduleWorkouts) {
//                   wedMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (tueEvening) {
//                 for (const scheduleWorkout of tueEvening?.scheduleWorkouts) {
//                   tueEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (wedEvening) {
//                 for (const scheduleWorkout of wedEvening?.scheduleWorkouts) {
//                   wedEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) =>
//                   wedMorningWorkoutTypes.includes(type) ||
//                   tueEveningWorkoutTypes.includes(type) ||
//                   wedEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 twoDayAfter = true;
//               } else {
//                 twoDayAfter = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayAfter) {
//               //Monday 1.5 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const wedMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Wednesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const tueEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Tuesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const tueEveningWorkoutTypes: string[] = [];
//               const wedMorningWorkoutTypes: string[] = [];
//               if (tueEvening) {
//                 for (const scheduleWorkout of tueEvening?.scheduleWorkouts) {
//                   tueEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               if (wedMorning) {
//                 for (const scheduleWorkout of wedMorning?.scheduleWorkouts) {
//                   wedMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) => tueEveningWorkoutTypes.includes(type) || wedMorningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 oneHalfDayAfter = true;
//               } else {
//                 oneHalfDayAfter = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneDayAfter) {
//               //Monday 2 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//               const tueEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Tuesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const tueEveningWorkoutTypes: string[] = [];
//               if (tueEvening) {
//                 for (const scheduleWorkout of tueEvening?.scheduleWorkouts) {
//                   tueEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 tueEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 oneDayAfter = true;
//               } else {
//                 oneDayAfter = false;
//               }
//             }
//           }

//           if (
//             twoDayBefore &&
//             oneHalfDayBefore &&
//             oneDayBefore &&
//             oneDayAfter &&
//             oneDayAfter &&
//             oneHalfDayAfter &&
//             twoDayAfter
//           ) {
//             //now check low intensity rules
//             const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
//               where: {
//                 planId: originalPlan.id,
//               },
//             });

//             const lowIntensityWorkoutTypes = lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes;

//             if (lowIntensityWorkoutTypes) {
//               const lowIntensityRules = await this.prisma.lowIntensityRules.findMany({
//                 where: {
//                   planId: originalPlan.id,
//                 },
//               });

//               let lowIntensityCounter = 0;
//               let restDayCounter = 0;
//               for (const lowIntensityRule of lowIntensityRules) {
//                 const { ifClauses, thenClause } = lowIntensityRule;

//                 const backTrack = ifClauses.length;

//                 if (lowIntensityCounter !== 1 || restDayCounter !== 1) {
//                   if (backTrack === 1) {
//                     //Monday Mor ===> Sunday Even
//                     if (
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                     ) {
//                       const highIntensityWorkoutType = ifClauses[0];
//                       const mondayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Monday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const mondayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Monday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const mondayEveningWorkoutTypes: string[] = [];
//                       const mondayMorningWorkoutTypes: string[] = [];

//                       if (mondayEvening) {
//                         for (const scheduleWorkout of mondayEvening.scheduleWorkouts) {
//                           mondayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (mondayMorning) {
//                         for (const scheduleWorkout of mondayMorning.scheduleWorkouts) {
//                           mondayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       // Check if highIntensityWorkoutType is in sundayEveningWorkoutTypes or sundayMorningWorkoutTypes
//                       const isHighWorkoutTypeInEvening =
//                         mondayEveningWorkoutTypes.includes(highIntensityWorkoutType);
//                       const isHighWorkoutTypeInMorning =
//                         mondayMorningWorkoutTypes.includes(highIntensityWorkoutType);

//                       if (isHighWorkoutTypeInEvening || isHighWorkoutTypeInMorning) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           lowIntensityCounter = 1;
//                           counter = counter + 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];

//                           //check combination rules as well to see if anything comes before or after

//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Tuesday,
//                             GYM_SESSION.Morning,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Tuesday, highIntensityRestDay.get(DAY.Tuesday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//               if (lowIntensityCounter === 0 && restDayCounter === 0) {
//                 workoutOccurrence = workoutOccurrence + 1;
//                 counter = counter + 1;

//                 //check combination rules as well to see if anything comes before or after

//                 await this.handleCombinations(
//                   originalPlan,
//                   workoutType,
//                   userPlan,
//                   DAY.Tuesday,
//                   GYM_SESSION.Morning,
//                   daysOfWeek,
//                 );
//               }
//             } else {
//               workoutOccurrence = workoutOccurrence + 1;
//               counter = counter + 1;

//               //check combination rules as well to see if anything comes before or after

//               await this.handleCombinations(
//                 originalPlan,
//                 workoutType,
//                 userPlan,
//                 DAY.Tuesday,
//                 GYM_SESSION.Morning,
//                 daysOfWeek,
//               );
//             }
//           }
//         }
//       } else if (weekDaySetting.session === GYM_SESSION.Evening) {
//         const exist = await this.prisma.planSchedule.findUnique({
//           where: {
//             week_day_gymSession_planId: {
//               week: 1,
//               planId: userPlan.planId,
//               gymSession: GYM_SESSION.Evening,
//               day: DAY.Tuesday,
//             },
//           },
//           include: {
//             scheduleWorkouts: {
//               include: {
//                 workout: true,
//               },
//             },
//           },
//         });

//         if (highIntensityRestDay.get(DAY.Tuesday) === 0) {
//           if (!exist) {
//             //check break rules
//             const breakRules = await this.prisma.breakRules.findMany({
//               where: {
//                 planId: originalPlan.id,
//                 workoutType,
//               },
//             });

//             let twoDayBefore = true;
//             let oneHalfDayBefore = true;
//             let oneDayBefore = true;
//             let oneDayAfter = true;
//             let oneHalfDayAfter = true;
//             let twoDayAfter = true;

//             for (const breakRule of breakRules) {
//               if (breakRule.day === BREAK_RULE_DAYS.TwoDayBefore) {
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//                 const tueMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Monday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const monMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Monday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const monEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Monday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const tueMorningWorkoutTypes: string[] = [];
//                 const monMorningWorkoutTypes: string[] = [];
//                 const monEveningWorkoutTypes: string[] = [];
//                 if (monMorning) {
//                   for (const scheduleWorkout of monMorning?.scheduleWorkouts) {
//                     monMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (tueMorning) {
//                   for (const scheduleWorkout of tueMorning?.scheduleWorkouts) {
//                     tueMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (monEvening) {
//                   for (const scheduleWorkout of monEvening?.scheduleWorkouts) {
//                     monEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) =>
//                     monMorningWorkoutTypes.includes(type) ||
//                     tueMorningWorkoutTypes.includes(type) ||
//                     monEveningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   twoDayBefore = true;
//                 } else {
//                   twoDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayBefore) {
//                 //Monday 1.5 ===> Sat Evening
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const tueMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Tuesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const monEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Monday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const tueMorningWorkoutTypes: string[] = [];
//                 const monEveningWorkoutTypes: string[] = [];

//                 if (tueMorning) {
//                   for (const scheduleWorkout of tueMorning?.scheduleWorkouts) {
//                     tueMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (monEvening) {
//                   for (const scheduleWorkout of monEvening?.scheduleWorkouts) {
//                     monEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) => tueMorningWorkoutTypes.includes(type) || monEveningWorkoutTypes.includes(type),
//                 );

//                 if (!isWorkoutTypeInSchedule) {
//                   oneHalfDayBefore = true;
//                   //means no break
//                 } else {
//                   oneHalfDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneDayBefore) {
//                 //Monday 1 ===> Sun Morning

//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const tueMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Monday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const tueMorningWorkoutTypes: string[] = [];

//                 if (tueMorning) {
//                   for (const scheduleWorkout of tueMorning?.scheduleWorkouts) {
//                     tueMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                   tueMorningWorkoutTypes.includes(type),
//                 );

//                 if (!isWorkoutTypeInSchedule) {
//                   oneDayBefore = true;
//                   //means no break
//                 } else {
//                   oneDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.TwoDayAfter) {
//                 //Monday 2 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const wedEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Wednesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const wedMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Wednesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const thuMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Thursday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const wedMorningWorkoutTypes: string[] = [];
//                 const wedEveningWorkoutTypes: string[] = [];
//                 const thuMorningWorkoutTypes: string[] = [];
//                 if (wedMorning) {
//                   for (const scheduleWorkout of wedMorning?.scheduleWorkouts) {
//                     wedMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (wedEvening) {
//                   for (const scheduleWorkout of wedEvening?.scheduleWorkouts) {
//                     wedEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (thuMorning) {
//                   for (const scheduleWorkout of thuMorning?.scheduleWorkouts) {
//                     thuMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) =>
//                     wedMorningWorkoutTypes.includes(type) ||
//                     wedEveningWorkoutTypes.includes(type) ||
//                     thuMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   twoDayAfter = true;
//                 } else {
//                   twoDayAfter = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayAfter) {
//                 //Monday 1.5 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const wedMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Wednesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const wedEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Wednesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const wedEveningWorkoutTypes: string[] = [];
//                 const wedMorningWorkoutTypes: string[] = [];
//                 if (wedEvening) {
//                   for (const scheduleWorkout of wedEvening?.scheduleWorkouts) {
//                     wedEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 if (wedMorning) {
//                   for (const scheduleWorkout of wedMorning?.scheduleWorkouts) {
//                     wedMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) => wedEveningWorkoutTypes.includes(type) || wedMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   oneHalfDayAfter = true;
//                 } else {
//                   oneHalfDayAfter = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneDayAfter) {
//                 //Monday 2 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//                 const wedMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Wednesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const wedMorningWorkoutTypes: string[] = [];
//                 if (wedMorning) {
//                   for (const scheduleWorkout of wedMorning?.scheduleWorkouts) {
//                     wedMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                   wedMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   oneDayAfter = true;
//                 } else {
//                   oneDayAfter = false;
//                 }
//               }
//             }

//             if (
//               twoDayBefore &&
//               oneHalfDayBefore &&
//               oneDayBefore &&
//               oneDayAfter &&
//               oneDayAfter &&
//               oneHalfDayAfter &&
//               twoDayAfter
//             ) {
//               const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
//                 where: {
//                   planId: originalPlan.id,
//                 },
//               });

//               const lowIntensityWorkoutTypes = lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes;

//               if (lowIntensityWorkoutTypes) {
//                 const lowIntensityRules = await this.prisma.lowIntensityRules.findMany({
//                   where: {
//                     planId: originalPlan.id,
//                   },
//                 });

//                 let lowIntensityCounter = 0;
//                 let restDayCounter = 0;
//                 for (const lowIntensityRule of lowIntensityRules) {
//                   const { ifClauses, thenClause } = lowIntensityRule;

//                   const backTrack = ifClauses.length;

//                   if (lowIntensityCounter !== 1 || restDayCounter !== 1) {
//                     if (backTrack === 1) {
//                       //Monday Mor ===> Sunday Even
//                       if (
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                       ) {
//                         const highIntensityWorkoutType = ifClauses[0];
//                         const mondayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Monday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const mondayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Monday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const mondayEveningWorkoutTypes: string[] = [];
//                         const mondayMorningWorkoutTypes: string[] = [];

//                         if (mondayEvening) {
//                           for (const scheduleWorkout of mondayEvening.scheduleWorkouts) {
//                             mondayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (mondayMorning) {
//                           for (const scheduleWorkout of mondayMorning.scheduleWorkouts) {
//                             mondayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         // Check if highIntensityWorkoutType is in sundayEveningWorkoutTypes or sundayMorningWorkoutTypes
//                         const isHighWorkoutTypeInEvening =
//                           mondayEveningWorkoutTypes.includes(highIntensityWorkoutType);
//                         const isHighWorkoutTypeInMorning =
//                           mondayMorningWorkoutTypes.includes(highIntensityWorkoutType);

//                         if (isHighWorkoutTypeInEvening || isHighWorkoutTypeInMorning) {
//                           if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                             lowIntensityCounter = 1;
//                             counter = counter + 1;

//                             const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                             // Select one workout type randomly
//                             const randomLowIntensityWorkoutType =
//                               shuffledLowIntensityWorkoutTypes[
//                                 Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                               ];

//                             //check combination rules as well to see if anything comes before or after

//                             await this.handleCombinations(
//                               originalPlan,
//                               randomLowIntensityWorkoutType,
//                               userPlan,
//                               DAY.Tuesday,
//                               GYM_SESSION.Evening,
//                               daysOfWeek,
//                             );
//                           } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                             //increment restDay counter
//                             highIntensityRestDay.set(DAY.Tuesday, highIntensityRestDay.get(DAY.Tuesday) + 1);
//                             restDayCounter = 1;
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//                 if (lowIntensityCounter === 0 && restDayCounter === 0) {
//                   workoutOccurrence = workoutOccurrence + 1;
//                   counter = counter + 1;

//                   //check combination rules as well to see if anything comes before or after

//                   await this.handleCombinations(
//                     originalPlan,
//                     workoutType,
//                     userPlan,
//                     DAY.Tuesday,
//                     GYM_SESSION.Evening,
//                     daysOfWeek,
//                   );
//                 }
//               } else {
//                 workoutOccurrence = workoutOccurrence + 1;
//                 counter = counter + 1;

//                 //check combination rules as well to see if anything comes before or after

//                 await this.handleCombinations(
//                   originalPlan,
//                   workoutType,
//                   userPlan,
//                   DAY.Tuesday,
//                   GYM_SESSION.Evening,
//                   daysOfWeek,
//                 );
//               }
//             }
//           }
//         }
//       }
//     }
//   } else if (weekDaySetting.day === DAY.Wednesday) {
//     if (this.countConsecutiveNonZeroDays(daysOfWeek, DAY.Wednesday) !== restDays) {
//       if (weekDaySetting.session === GYM_SESSION.Morning) {
//         const exist = await this.prisma.planSchedule.findUnique({
//           where: {
//             week_day_gymSession_planId: {
//               week: 1,
//               planId: userPlan.planId,
//               gymSession: GYM_SESSION.Morning,
//               day: DAY.Wednesday,
//             },
//           },
//           include: {
//             scheduleWorkouts: {
//               include: {
//                 workout: true,
//               },
//             },
//           },
//         });

//         if (!exist) {
//           //check break rules
//           const breakRules = await this.prisma.breakRules.findMany({
//             where: {
//               planId: originalPlan.id,
//               workoutType,
//             },
//           });

//           let twoDayBefore = true;
//           let oneHalfDayBefore = true;
//           let oneDayBefore = true;
//           let oneDayAfter = true;
//           let oneHalfDayAfter = true;
//           let twoDayAfter = true;

//           for (const breakRule of breakRules) {
//             if (breakRule.day === BREAK_RULE_DAYS.TwoDayBefore) {
//               //Monday 2 ===> Sat Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//               const tueEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Tuesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const tueMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Tuesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const monEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Monday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const tueEveningWorkoutTypes: string[] = [];
//               const tueMorningWorkoutTypes: string[] = [];
//               const monEveningWorkoutTypes: string[] = [];
//               if (tueEvening) {
//                 for (const scheduleWorkout of tueEvening?.scheduleWorkouts) {
//                   tueEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (tueMorning) {
//                 for (const scheduleWorkout of tueMorning?.scheduleWorkouts) {
//                   tueMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (monEvening) {
//                 for (const scheduleWorkout of monEvening?.scheduleWorkouts) {
//                   monEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) =>
//                   tueEveningWorkoutTypes.includes(type) ||
//                   tueMorningWorkoutTypes.includes(type) ||
//                   monEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 twoDayBefore = true;
//               } else {
//                 twoDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayBefore) {
//               //Monday 1.5 ===> Sat Evening
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const tueMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Tuesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const tueEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Tuesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const tueMorningWorkoutTypes: string[] = [];
//               const tueEveningWorkoutTypes: string[] = [];

//               if (tueMorning) {
//                 for (const scheduleWorkout of tueMorning?.scheduleWorkouts) {
//                   tueMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (tueEvening) {
//                 for (const scheduleWorkout of tueEvening?.scheduleWorkouts) {
//                   tueEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) => tueMorningWorkoutTypes.includes(type) || tueEveningWorkoutTypes.includes(type),
//               );

//               if (!isWorkoutTypeInSchedule) {
//                 oneHalfDayBefore = true;
//                 //means no break
//               } else {
//                 oneHalfDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneDayBefore) {
//               //Monday 1 ===> Sun Morning

//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const tueEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Tuesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const tueEveningWorkoutTypes: string[] = [];

//               if (tueEvening) {
//                 for (const scheduleWorkout of tueEvening?.scheduleWorkouts) {
//                   tueEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 tueEveningWorkoutTypes.includes(type),
//               );

//               if (!isWorkoutTypeInSchedule) {
//                 oneDayBefore = true;
//                 //means no break
//               } else {
//                 oneDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.TwoDayAfter) {
//               //Monday 2 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const wedEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Wednesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const thuMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Thursday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const thuEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Thursday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedEveningWorkoutTypes: string[] = [];
//               const thuMorningWorkoutTypes: string[] = [];
//               const thuEveningWorkoutTypes: string[] = [];
//               if (wedEvening) {
//                 for (const scheduleWorkout of wedEvening?.scheduleWorkouts) {
//                   wedEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (thuMorning) {
//                 for (const scheduleWorkout of thuMorning?.scheduleWorkouts) {
//                   thuMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (thuEvening) {
//                 for (const scheduleWorkout of thuEvening?.scheduleWorkouts) {
//                   thuEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) =>
//                   wedEveningWorkoutTypes.includes(type) ||
//                   thuMorningWorkoutTypes.includes(type) ||
//                   thuEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 twoDayAfter = true;
//               } else {
//                 twoDayAfter = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayAfter) {
//               //Monday 1.5 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const thuMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Thursday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Wednesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedEveningWorkoutTypes: string[] = [];
//               const thuMorningWorkoutTypes: string[] = [];
//               if (wedEvening) {
//                 for (const scheduleWorkout of wedEvening?.scheduleWorkouts) {
//                   wedEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               if (thuMorning) {
//                 for (const scheduleWorkout of thuMorning?.scheduleWorkouts) {
//                   thuMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) => wedEveningWorkoutTypes.includes(type) || thuMorningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 oneHalfDayAfter = true;
//               } else {
//                 oneHalfDayAfter = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneDayAfter) {
//               //Monday 2 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//               const wedEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Wednesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedEveningWorkoutTypes: string[] = [];
//               if (wedEvening) {
//                 for (const scheduleWorkout of wedEvening?.scheduleWorkouts) {
//                   wedEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 wedEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 oneDayAfter = true;
//               } else {
//                 oneDayAfter = false;
//               }
//             }
//           }

//           if (
//             twoDayBefore &&
//             oneHalfDayBefore &&
//             oneDayBefore &&
//             oneDayAfter &&
//             oneDayAfter &&
//             oneHalfDayAfter &&
//             twoDayAfter
//           ) {
//             //now check low intensity rules
//             const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
//               where: {
//                 planId: originalPlan.id,
//               },
//             });

//             const lowIntensityWorkoutTypes = lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes;

//             if (lowIntensityWorkoutTypes) {
//               const lowIntensityRules = await this.prisma.lowIntensityRules.findMany({
//                 where: {
//                   planId: originalPlan.id,
//                 },
//               });

//               let lowIntensityCounter = 0;
//               let restDayCounter = 0;
//               for (const lowIntensityRule of lowIntensityRules) {
//                 const { ifClauses, thenClause } = lowIntensityRule;

//                 const backTrack = ifClauses.length;

//                 if (lowIntensityCounter !== 1 || restDayCounter !== 1) {
//                   if (backTrack === 1) {
//                     //Monday Mor ===> Sunday Even
//                     if (
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                     ) {
//                       const highIntensityWorkoutType = ifClauses[0];
//                       const tuesdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Tuesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const tuesdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Tuesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const tuesdayEveningWorkoutTypes: string[] = [];
//                       const tuesdayMorningWorkoutTypes: string[] = [];

//                       if (tuesdayEvening) {
//                         for (const scheduleWorkout of tuesdayEvening.scheduleWorkouts) {
//                           tuesdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (tuesdayMorning) {
//                         for (const scheduleWorkout of tuesdayMorning.scheduleWorkouts) {
//                           tuesdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       // Check if highIntensityWorkoutType is in sundayEveningWorkoutTypes or sundayMorningWorkoutTypes
//                       const isHighWorkoutTypeInEvening =
//                         tuesdayEveningWorkoutTypes.includes(highIntensityWorkoutType);
//                       const isHighWorkoutTypeInMorning =
//                         tuesdayMorningWorkoutTypes.includes(highIntensityWorkoutType);

//                       if (isHighWorkoutTypeInEvening || isHighWorkoutTypeInMorning) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           lowIntensityCounter = 1;
//                           counter = counter + 1;
//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];

//                           //check combination rules as well to see if anything comes before or after

//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Wednesday,
//                             GYM_SESSION.Morning,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Wednesday, highIntensityRestDay.get(DAY.Wednesday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   } else if (backTrack === 2) {
//                     //Monday Mor ===> Sat Mor, Sat Even, Sun Mor, Sun Even
//                     if (
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay &&
//                       ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                     ) {
//                       const highIntensityWorkoutTypeOne = ifClauses[0];
//                       const highIntensityWorkoutTypeTwo = ifClauses[1];

//                       const tuesdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Tuesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const tuesdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Tuesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const mondayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Monday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const mondayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Monday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const tuesdayEveningWorkoutTypes: string[] = [];
//                       const tuesdayMorningWorkoutTypes: string[] = [];
//                       const mondayEveningWorkoutTypes: string[] = [];
//                       const mondayMorningWorkoutTypes: string[] = [];

//                       if (tuesdayEvening) {
//                         for (const scheduleWorkout of tuesdayEvening.scheduleWorkouts) {
//                           tuesdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (tuesdayMorning) {
//                         for (const scheduleWorkout of tuesdayMorning.scheduleWorkouts) {
//                           tuesdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (mondayEvening) {
//                         for (const scheduleWorkout of mondayEvening.scheduleWorkouts) {
//                           mondayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (mondayMorning) {
//                         for (const scheduleWorkout of mondayMorning.scheduleWorkouts) {
//                           mondayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       // Check if highIntensityWorkoutTypeOne is in both Saturday and Sunday

//                       const isHighWorkoutTypeOneInMonday =
//                         mondayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                         mondayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                       const isHighWorkoutTypeOneInTuesday =
//                         tuesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                         tuesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                       // Check if highIntensityWorkoutTypeTwo is in both Saturday and Sunday
//                       const isHighWorkoutTypeTwoInMonday =
//                         mondayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                         mondayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                       const isHighWorkoutTypeTwoInTuesday =
//                         tuesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                         tuesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                       // Trigger logic if both high-intensity workouts are scheduled on consecutive days
//                       if (
//                         (isHighWorkoutTypeOneInMonday || isHighWorkoutTypeOneInTuesday) &&
//                         (isHighWorkoutTypeTwoInMonday || isHighWorkoutTypeTwoInTuesday)
//                       ) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           counter = counter + 1;
//                           lowIntensityCounter = 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];

//                           //check combination rules as well to see if anything comes before or after

//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Wednesday,
//                             GYM_SESSION.Morning,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Wednesday, highIntensityRestDay.get(DAY.Wednesday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//               if (lowIntensityCounter === 0 && restDayCounter === 0) {
//                 workoutOccurrence = workoutOccurrence + 1;
//                 counter = counter + 1;

//                 //check combination rules as well to see if anything comes before or after

//                 await this.handleCombinations(
//                   originalPlan,
//                   workoutType,
//                   userPlan,
//                   DAY.Wednesday,
//                   GYM_SESSION.Morning,
//                   daysOfWeek,
//                 );
//               }
//             } else {
//               workoutOccurrence = workoutOccurrence + 1;
//               counter = counter + 1;

//               //check combination rules as well to see if anything comes before or after
//               await this.handleCombinations(
//                 originalPlan,
//                 workoutType,
//                 userPlan,
//                 DAY.Wednesday,
//                 GYM_SESSION.Morning,
//                 daysOfWeek,
//               );
//             }
//           }
//         }
//       } else if (weekDaySetting.session === GYM_SESSION.Evening) {
//         const exist = await this.prisma.planSchedule.findUnique({
//           where: {
//             week_day_gymSession_planId: {
//               week: 1,
//               planId: userPlan.planId,
//               gymSession: GYM_SESSION.Evening,
//               day: DAY.Wednesday,
//             },
//           },
//           include: {
//             scheduleWorkouts: {
//               include: {
//                 workout: true,
//               },
//             },
//           },
//         });

//         if (highIntensityRestDay.get(DAY.Wednesday) === 0) {
//           if (!exist) {
//             //check break rules
//             const breakRules = await this.prisma.breakRules.findMany({
//               where: {
//                 planId: originalPlan.id,
//                 workoutType,
//               },
//             });

//             let twoDayBefore = true;
//             let oneHalfDayBefore = true;
//             let oneDayBefore = true;
//             let oneDayAfter = true;
//             let oneHalfDayAfter = true;
//             let twoDayAfter = true;

//             for (const breakRule of breakRules) {
//               if (breakRule.day === BREAK_RULE_DAYS.TwoDayBefore) {
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//                 const wedMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Wednesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const tueMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Tuesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const tueEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Tuesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const wedMorningWorkoutTypes: string[] = [];
//                 const tueMorningWorkoutTypes: string[] = [];
//                 const tueEveningWorkoutTypes: string[] = [];
//                 if (wedMorning) {
//                   for (const scheduleWorkout of wedMorning?.scheduleWorkouts) {
//                     wedMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (tueMorning) {
//                   for (const scheduleWorkout of tueMorning?.scheduleWorkouts) {
//                     tueMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (tueEvening) {
//                   for (const scheduleWorkout of tueEvening?.scheduleWorkouts) {
//                     tueEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) =>
//                     wedMorningWorkoutTypes.includes(type) ||
//                     tueMorningWorkoutTypes.includes(type) ||
//                     tueEveningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   twoDayBefore = true;
//                 } else {
//                   twoDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayBefore) {
//                 //Monday 1.5 ===> Sat Evening
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const wedMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Wednesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const tueEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Tuesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const wedMorningWorkoutTypes: string[] = [];
//                 const tueEveningWorkoutTypes: string[] = [];

//                 if (wedMorning) {
//                   for (const scheduleWorkout of wedMorning?.scheduleWorkouts) {
//                     wedMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (tueEvening) {
//                   for (const scheduleWorkout of tueEvening?.scheduleWorkouts) {
//                     tueEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) => wedMorningWorkoutTypes.includes(type) || tueEveningWorkoutTypes.includes(type),
//                 );

//                 if (!isWorkoutTypeInSchedule) {
//                   oneHalfDayBefore = true;
//                   //means no break
//                 } else {
//                   oneHalfDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneDayBefore) {
//                 //Monday 1 ===> Sun Morning

//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const wedMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Wednesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const wedMorningWorkoutTypes: string[] = [];

//                 if (wedMorning) {
//                   for (const scheduleWorkout of wedMorning?.scheduleWorkouts) {
//                     wedMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                   wedMorningWorkoutTypes.includes(type),
//                 );

//                 if (!isWorkoutTypeInSchedule) {
//                   oneDayBefore = true;
//                   //means no break
//                 } else {
//                   oneDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.TwoDayAfter) {
//                 //Monday 2 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const thuEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Thursday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const thuMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Thursday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const friMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Friday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const thuMorningWorkoutTypes: string[] = [];
//                 const thuEveningWorkoutTypes: string[] = [];
//                 const friMorningWorkoutTypes: string[] = [];
//                 if (thuMorning) {
//                   for (const scheduleWorkout of thuMorning?.scheduleWorkouts) {
//                     thuMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (thuEvening) {
//                   for (const scheduleWorkout of thuEvening?.scheduleWorkouts) {
//                     thuEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (friMorning) {
//                   for (const scheduleWorkout of friMorning?.scheduleWorkouts) {
//                     friMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) =>
//                     thuMorningWorkoutTypes.includes(type) ||
//                     thuEveningWorkoutTypes.includes(type) ||
//                     friMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   twoDayAfter = true;
//                 } else {
//                   twoDayAfter = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayAfter) {
//                 //Monday 1.5 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const thuMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Thursday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const thuEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Thursday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const thuEveningWorkoutTypes: string[] = [];
//                 const thuMorningWorkoutTypes: string[] = [];
//                 if (thuEvening) {
//                   for (const scheduleWorkout of thuEvening?.scheduleWorkouts) {
//                     thuEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 if (thuMorning) {
//                   for (const scheduleWorkout of thuMorning?.scheduleWorkouts) {
//                     thuMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) => thuEveningWorkoutTypes.includes(type) || thuMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   oneHalfDayAfter = true;
//                 } else {
//                   oneHalfDayAfter = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneDayAfter) {
//                 //Monday 2 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//                 const thuMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Thursday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const thuMorningWorkoutTypes: string[] = [];
//                 if (thuMorning) {
//                   for (const scheduleWorkout of thuMorning?.scheduleWorkouts) {
//                     thuMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                   thuMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   oneDayAfter = true;
//                 } else {
//                   oneDayAfter = false;
//                 }
//               }
//             }

//             if (
//               twoDayBefore &&
//               oneHalfDayBefore &&
//               oneDayBefore &&
//               oneDayAfter &&
//               oneDayAfter &&
//               oneHalfDayAfter &&
//               twoDayAfter
//             ) {
//               const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
//                 where: {
//                   planId: originalPlan.id,
//                 },
//               });

//               const lowIntensityWorkoutTypes = lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes;

//               if (lowIntensityWorkoutTypes) {
//                 const lowIntensityRules = await this.prisma.lowIntensityRules.findMany({
//                   where: {
//                     planId: originalPlan.id,
//                   },
//                 });

//                 let lowIntensityCounter = 0;
//                 let restDayCounter = 0;
//                 for (const lowIntensityRule of lowIntensityRules) {
//                   const { ifClauses, thenClause } = lowIntensityRule;

//                   const backTrack = ifClauses.length;

//                   if (lowIntensityCounter !== 1 || restDayCounter !== 1) {
//                     if (backTrack === 1) {
//                       //Monday Mor ===> Sunday Even
//                       if (
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                       ) {
//                         const highIntensityWorkoutType = ifClauses[0];
//                         const tuesdayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Tuesday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const tuesdayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Tuesday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const tuesdayEveningWorkoutTypes: string[] = [];
//                         const tuesdayMorningWorkoutTypes: string[] = [];

//                         if (tuesdayEvening) {
//                           for (const scheduleWorkout of tuesdayEvening.scheduleWorkouts) {
//                             tuesdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (tuesdayMorning) {
//                           for (const scheduleWorkout of tuesdayMorning.scheduleWorkouts) {
//                             tuesdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         // Check if highIntensityWorkoutType is in sundayEveningWorkoutTypes or sundayMorningWorkoutTypes
//                         const isHighWorkoutTypeInEvening =
//                           tuesdayEveningWorkoutTypes.includes(highIntensityWorkoutType);
//                         const isHighWorkoutTypeInMorning =
//                           tuesdayMorningWorkoutTypes.includes(highIntensityWorkoutType);

//                         if (isHighWorkoutTypeInEvening || isHighWorkoutTypeInMorning) {
//                           if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                             lowIntensityCounter = 1;
//                             counter = counter + 1;
//                             const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                             // Select one workout type randomly
//                             const randomLowIntensityWorkoutType =
//                               shuffledLowIntensityWorkoutTypes[
//                                 Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                               ];

//                             //check combination rules as well to see if anything comes before or after

//                             await this.handleCombinations(
//                               originalPlan,
//                               randomLowIntensityWorkoutType,
//                               userPlan,
//                               DAY.Wednesday,
//                               GYM_SESSION.Evening,
//                               daysOfWeek,
//                             );
//                           } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                             //increment restDay counter
//                             highIntensityRestDay.set(DAY.Wednesday, highIntensityRestDay.get(DAY.Wednesday) + 1);
//                             restDayCounter = 1;
//                           }
//                         }
//                       }
//                     } else if (backTrack === 2) {
//                       //Monday Mor ===> Sat Mor, Sat Even, Sun Mor, Sun Even
//                       if (
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay &&
//                         ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                       ) {
//                         const highIntensityWorkoutTypeOne = ifClauses[0];
//                         const highIntensityWorkoutTypeTwo = ifClauses[1];

//                         const tuesdayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Tuesday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const tuesdayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Tuesday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const mondayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Monday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const mondayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Monday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const tuesdayEveningWorkoutTypes: string[] = [];
//                         const tuesdayMorningWorkoutTypes: string[] = [];
//                         const mondayEveningWorkoutTypes: string[] = [];
//                         const mondayMorningWorkoutTypes: string[] = [];

//                         if (tuesdayEvening) {
//                           for (const scheduleWorkout of tuesdayEvening.scheduleWorkouts) {
//                             tuesdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (tuesdayMorning) {
//                           for (const scheduleWorkout of tuesdayMorning.scheduleWorkouts) {
//                             tuesdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (mondayEvening) {
//                           for (const scheduleWorkout of mondayEvening.scheduleWorkouts) {
//                             mondayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (mondayMorning) {
//                           for (const scheduleWorkout of mondayMorning.scheduleWorkouts) {
//                             mondayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         // Check if highIntensityWorkoutTypeOne is in both Saturday and Sunday

//                         const isHighWorkoutTypeOneInMonday =
//                           mondayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                           mondayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                         const isHighWorkoutTypeOneInTuesday =
//                           tuesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                           tuesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                         // Check if highIntensityWorkoutTypeTwo is in both Saturday and Sunday
//                         const isHighWorkoutTypeTwoInMonday =
//                           mondayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                           mondayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                         const isHighWorkoutTypeTwoInTuesday =
//                           tuesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                           tuesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                         // Trigger logic if both high-intensity workouts are scheduled on consecutive days
//                         if (
//                           (isHighWorkoutTypeOneInMonday || isHighWorkoutTypeOneInTuesday) &&
//                           (isHighWorkoutTypeTwoInMonday || isHighWorkoutTypeTwoInTuesday)
//                         ) {
//                           if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                             counter = counter + 1;
//                             lowIntensityCounter = 1;

//                             const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                             // Select one workout type randomly
//                             const randomLowIntensityWorkoutType =
//                               shuffledLowIntensityWorkoutTypes[
//                                 Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                               ];

//                             //check combination rules as well to see if anything comes before or after

//                             await this.handleCombinations(
//                               originalPlan,
//                               randomLowIntensityWorkoutType,
//                               userPlan,
//                               DAY.Wednesday,
//                               GYM_SESSION.Evening,
//                               daysOfWeek,
//                             );
//                           } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                             //increment restDay counter
//                             highIntensityRestDay.set(DAY.Wednesday, highIntensityRestDay.get(DAY.Wednesday) + 1);
//                             restDayCounter = 1;
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//                 if (lowIntensityCounter === 0 && restDayCounter === 0) {
//                   workoutOccurrence = workoutOccurrence + 1;
//                   counter = counter + 1;

//                   //check combination rules as well to see if anything comes before or after

//                   await this.handleCombinations(
//                     originalPlan,
//                     workoutType,
//                     userPlan,
//                     DAY.Wednesday,
//                     GYM_SESSION.Evening,
//                     daysOfWeek,
//                   );
//                 }
//               } else {
//                 workoutOccurrence = workoutOccurrence + 1;
//                 counter = counter + 1;

//                 //check combination rules as well to see if anything comes before or after

//                 await this.handleCombinations(
//                   originalPlan,
//                   workoutType,
//                   userPlan,
//                   DAY.Wednesday,
//                   GYM_SESSION.Evening,
//                   daysOfWeek,
//                 );
//               }
//             }
//           }
//         }
//       }
//     }
//   } else if (weekDaySetting.day === DAY.Thursday) {
//     if (this.countConsecutiveNonZeroDays(daysOfWeek, DAY.Thursday) !== restDays) {
//       if (weekDaySetting.session === GYM_SESSION.Morning) {
//         const exist = await this.prisma.planSchedule.findUnique({
//           where: {
//             week_day_gymSession_planId: {
//               week: 1,
//               planId: userPlan.planId,
//               gymSession: GYM_SESSION.Morning,
//               day: DAY.Thursday,
//             },
//           },
//           include: {
//             scheduleWorkouts: {
//               include: {
//                 workout: true,
//               },
//             },
//           },
//         });

//         if (!exist) {
//           //check break rules
//           const breakRules = await this.prisma.breakRules.findMany({
//             where: {
//               planId: originalPlan.id,
//               workoutType,
//             },
//           });

//           let twoDayBefore = true;
//           let oneHalfDayBefore = true;
//           let oneDayBefore = true;
//           let oneDayAfter = true;
//           let oneHalfDayAfter = true;
//           let twoDayAfter = true;

//           for (const breakRule of breakRules) {
//             if (breakRule.day === BREAK_RULE_DAYS.TwoDayBefore) {
//               //Monday 2 ===> Sat Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//               const wedEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Wednesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Wednesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const tueEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Tuesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedEveningWorkoutTypes: string[] = [];
//               const wedMorningWorkoutTypes: string[] = [];
//               const tueEveningWorkoutTypes: string[] = [];
//               if (wedEvening) {
//                 for (const scheduleWorkout of wedEvening?.scheduleWorkouts) {
//                   wedEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (wedMorning) {
//                 for (const scheduleWorkout of wedMorning?.scheduleWorkouts) {
//                   wedMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (tueEvening) {
//                 for (const scheduleWorkout of tueEvening?.scheduleWorkouts) {
//                   tueEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) =>
//                   wedEveningWorkoutTypes.includes(type) ||
//                   wedMorningWorkoutTypes.includes(type) ||
//                   tueEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 twoDayBefore = true;
//               } else {
//                 twoDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayBefore) {
//               //Monday 1.5 ===> Sat Evening
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const wedMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Wednesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Wednesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedMorningWorkoutTypes: string[] = [];
//               const wedEveningWorkoutTypes: string[] = [];

//               if (wedMorning) {
//                 for (const scheduleWorkout of wedMorning?.scheduleWorkouts) {
//                   wedMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (wedEvening) {
//                 for (const scheduleWorkout of wedEvening?.scheduleWorkouts) {
//                   wedEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) => wedMorningWorkoutTypes.includes(type) || wedEveningWorkoutTypes.includes(type),
//               );

//               if (!isWorkoutTypeInSchedule) {
//                 oneHalfDayBefore = true;
//                 //means no break
//               } else {
//                 oneHalfDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneDayBefore) {
//               //Monday 1 ===> Sun Morning

//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const wedEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Wednesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedEveningWorkoutTypes: string[] = [];

//               if (wedEvening) {
//                 for (const scheduleWorkout of wedEvening?.scheduleWorkouts) {
//                   wedEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 wedEveningWorkoutTypes.includes(type),
//               );

//               if (!isWorkoutTypeInSchedule) {
//                 oneDayBefore = true;
//                 //means no break
//               } else {
//                 oneDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.TwoDayAfter) {
//               //Monday 2 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const thuEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Thursday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const friMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Friday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const friEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Friday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const thuEveningWorkoutTypes: string[] = [];
//               const friMorningWorkoutTypes: string[] = [];
//               const friEveningWorkoutTypes: string[] = [];
//               if (thuEvening) {
//                 for (const scheduleWorkout of thuEvening?.scheduleWorkouts) {
//                   thuEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (friMorning) {
//                 for (const scheduleWorkout of friMorning?.scheduleWorkouts) {
//                   friMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (friEvening) {
//                 for (const scheduleWorkout of friEvening?.scheduleWorkouts) {
//                   friEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) =>
//                   thuEveningWorkoutTypes.includes(type) ||
//                   friMorningWorkoutTypes.includes(type) ||
//                   friEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 twoDayAfter = true;
//               } else {
//                 twoDayAfter = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayAfter) {
//               //Monday 1.5 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const friMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Friday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const thuEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Thursday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const thuEveningWorkoutTypes: string[] = [];
//               const friMorningWorkoutTypes: string[] = [];
//               if (thuEvening) {
//                 for (const scheduleWorkout of thuEvening?.scheduleWorkouts) {
//                   thuEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               if (friMorning) {
//                 for (const scheduleWorkout of friMorning?.scheduleWorkouts) {
//                   friMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) => thuEveningWorkoutTypes.includes(type) || friMorningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 oneHalfDayAfter = true;
//               } else {
//                 oneHalfDayAfter = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneDayAfter) {
//               //Monday 2 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//               const thuEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Thursday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const thuEveningWorkoutTypes: string[] = [];
//               if (thuEvening) {
//                 for (const scheduleWorkout of thuEvening?.scheduleWorkouts) {
//                   thuEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 thuEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 oneDayAfter = true;
//               } else {
//                 oneDayAfter = false;
//               }
//             }
//           }

//           if (
//             twoDayBefore &&
//             oneHalfDayBefore &&
//             oneDayBefore &&
//             oneDayAfter &&
//             oneDayAfter &&
//             oneHalfDayAfter &&
//             twoDayAfter
//           ) {
//             //now check low intensity rules
//             const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
//               where: {
//                 planId: originalPlan.id,
//               },
//             });

//             const lowIntensityWorkoutTypes = lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes;

//             if (lowIntensityWorkoutTypes) {
//               const lowIntensityRules = await this.prisma.lowIntensityRules.findMany({
//                 where: {
//                   planId: originalPlan.id,
//                 },
//               });

//               let lowIntensityCounter = 0;
//               let restDayCounter = 0;
//               for (const lowIntensityRule of lowIntensityRules) {
//                 const { ifClauses, thenClause } = lowIntensityRule;

//                 const backTrack = ifClauses.length;

//                 if (lowIntensityCounter !== 1 || restDayCounter !== 1) {
//                   if (backTrack === 1) {
//                     //Monday Mor ===> Sunday Even
//                     if (
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                     ) {
//                       const highIntensityWorkoutType = ifClauses[0];
//                       const wednesdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Wednesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const wednesdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Wednesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const wednesdayEveningWorkoutTypes: string[] = [];
//                       const wednesdayMorningWorkoutTypes: string[] = [];

//                       if (wednesdayEvening) {
//                         for (const scheduleWorkout of wednesdayEvening.scheduleWorkouts) {
//                           wednesdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (wednesdayMorning) {
//                         for (const scheduleWorkout of wednesdayMorning.scheduleWorkouts) {
//                           wednesdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       // Check if highIntensityWorkoutType is in sundayEveningWorkoutTypes or sundayMorningWorkoutTypes
//                       const isHighWorkoutTypeInEvening =
//                         wednesdayEveningWorkoutTypes.includes(highIntensityWorkoutType);
//                       const isHighWorkoutTypeInMorning =
//                         wednesdayMorningWorkoutTypes.includes(highIntensityWorkoutType);

//                       if (isHighWorkoutTypeInEvening || isHighWorkoutTypeInMorning) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           lowIntensityCounter = 1;
//                           counter = counter + 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];

//                           //check combination rules as well to see if anything comes before or after

//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Thursday,
//                             GYM_SESSION.Morning,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Thursday, highIntensityRestDay.get(DAY.Thursday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   } else if (backTrack === 2) {
//                     //Monday Mor ===> Sat Mor, Sat Even, Sun Mor, Sun Even
//                     if (
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay &&
//                       ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                     ) {
//                       const highIntensityWorkoutTypeOne = ifClauses[0];
//                       const highIntensityWorkoutTypeTwo = ifClauses[1];

//                       const wednesdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Wednesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const wednesdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Wednesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const tuesdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Tuesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const tuesdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Tuesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const wednesdayEveningWorkoutTypes: string[] = [];
//                       const wednesdayMorningWorkoutTypes: string[] = [];
//                       const tuesdayEveningWorkoutTypes: string[] = [];
//                       const tuesdayMorningWorkoutTypes: string[] = [];

//                       if (wednesdayEvening) {
//                         for (const scheduleWorkout of wednesdayEvening.scheduleWorkouts) {
//                           wednesdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (wednesdayMorning) {
//                         for (const scheduleWorkout of wednesdayMorning.scheduleWorkouts) {
//                           wednesdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (tuesdayEvening) {
//                         for (const scheduleWorkout of tuesdayEvening.scheduleWorkouts) {
//                           tuesdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (tuesdayMorning) {
//                         for (const scheduleWorkout of tuesdayMorning.scheduleWorkouts) {
//                           tuesdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       // Check if highIntensityWorkoutTypeOne is in both Saturday and Sunday
//                       const isHighWorkoutTypeOneInTuesday =
//                         tuesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                         tuesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                       const isHighWorkoutTypeOneInWednesday =
//                         wednesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                         wednesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                       // Check if highIntensityWorkoutTypeTwo is in both Saturday and Sunday
//                       const isHighWorkoutTypeTwoInTuesday =
//                         tuesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                         tuesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                       const isHighWorkoutTypeTwoInWednesday =
//                         wednesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                         wednesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                       // Trigger logic if both high-intensity workouts are scheduled on consecutive days
//                       if (
//                         (isHighWorkoutTypeOneInTuesday || isHighWorkoutTypeOneInWednesday) &&
//                         (isHighWorkoutTypeTwoInTuesday || isHighWorkoutTypeTwoInWednesday)
//                       ) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           counter = counter + 1;
//                           lowIntensityCounter = 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];

//                           let lowIntensityWorkoutCount = 0;
//                           //check combination rules as well to see if anything comes before or after

//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Thursday,
//                             GYM_SESSION.Morning,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Thursday, highIntensityRestDay.get(DAY.Thursday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   } else if (backTrack === 3) {
//                     const highIntensityWorkoutTypeOne = ifClauses[0];
//                     const highIntensityWorkoutTypeTwo = ifClauses[1];
//                     const highIntensityWorkoutTypeThree = ifClauses[2];

//                     const mondayEvening = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Evening,
//                           day: DAY.Monday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const mondayMorning = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Morning,
//                           day: DAY.Monday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const tuesdayEvening = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Evening,
//                           day: DAY.Tuesday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const tuesdayMorning = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Morning,
//                           day: DAY.Tuesday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const wednesdayEvening = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Evening,
//                           day: DAY.Wednesday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const wednesdayMorning = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Morning,
//                           day: DAY.Wednesday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const mondayWorkoutTypes: string[] = [];
//                     const tuesdayWorkoutTypes: string[] = [];
//                     const wednesdayWorkoutTypes: string[] = [];

//                     if (mondayEvening) {
//                       for (const scheduleWorkout of mondayEvening.scheduleWorkouts) {
//                         mondayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (mondayMorning) {
//                       for (const scheduleWorkout of mondayMorning.scheduleWorkouts) {
//                         mondayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (tuesdayEvening) {
//                       for (const scheduleWorkout of tuesdayEvening.scheduleWorkouts) {
//                         tuesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (tuesdayMorning) {
//                       for (const scheduleWorkout of tuesdayMorning.scheduleWorkouts) {
//                         tuesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (wednesdayEvening) {
//                       for (const scheduleWorkout of wednesdayEvening.scheduleWorkouts) {
//                         wednesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (wednesdayMorning) {
//                       for (const scheduleWorkout of wednesdayMorning.scheduleWorkouts) {
//                         wednesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     const allWorkoutTypes = [
//                       ...mondayWorkoutTypes,
//                       ...tuesdayWorkoutTypes,
//                       ...wednesdayWorkoutTypes,
//                     ];

//                     // Check if all high-intensity workout types are present across Friday, Saturday, and Sunday
//                     const hasHighIntensityWorkouts =
//                       allWorkoutTypes.includes(highIntensityWorkoutTypeOne) &&
//                       allWorkoutTypes.includes(highIntensityWorkoutTypeTwo) &&
//                       allWorkoutTypes.includes(highIntensityWorkoutTypeThree);

//                     if (hasHighIntensityWorkouts) {
//                       if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                         counter = counter + 1;
//                         lowIntensityCounter = 1;

//                         const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                         let lowIntensityWorkoutCount = 0;
//                         // Select one workout type randomly
//                         const randomLowIntensityWorkoutType =
//                           shuffledLowIntensityWorkoutTypes[
//                             Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                           ];
//                         //check combination rules as well to see if anything comes before or after

//                         await this.handleCombinations(
//                           originalPlan,
//                           randomLowIntensityWorkoutType,
//                           userPlan,
//                           DAY.Thursday,
//                           GYM_SESSION.Morning,
//                           daysOfWeek,
//                         );
//                       } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                         //increment restDay counter
//                         highIntensityRestDay.set(DAY.Thursday, highIntensityRestDay.get(DAY.Thursday) + 1);
//                         restDayCounter = 1;
//                       }
//                     }
//                   }
//                 }
//               }
//               if (lowIntensityCounter === 0 && restDayCounter === 0) {
//                 workoutOccurrence = workoutOccurrence + 1;
//                 counter = counter + 1;

//                 //check combination rules as well to see if anything comes before or after

//                 await this.handleCombinations(
//                   originalPlan,
//                   workoutType,
//                   userPlan,
//                   DAY.Thursday,
//                   GYM_SESSION.Morning,
//                   daysOfWeek,
//                 );
//               }
//             } else {
//               workoutOccurrence = workoutOccurrence + 1;
//               counter = counter + 1;

//               //check combination rules as well to see if anything comes before or after

//               await this.handleCombinations(
//                 originalPlan,
//                 workoutType,
//                 userPlan,
//                 DAY.Thursday,
//                 GYM_SESSION.Morning,
//                 daysOfWeek,
//               );
//             }
//           }
//         }
//       } else if (weekDaySetting.session === GYM_SESSION.Evening) {
//         const exist = await this.prisma.planSchedule.findUnique({
//           where: {
//             week_day_gymSession_planId: {
//               week: 1,
//               planId: userPlan.planId,
//               gymSession: GYM_SESSION.Evening,
//               day: DAY.Thursday,
//             },
//           },
//           include: {
//             scheduleWorkouts: {
//               include: {
//                 workout: true,
//               },
//             },
//           },
//         });

//         if (highIntensityRestDay.get(DAY.Thursday) === 0) {
//           if (!exist) {
//             //check break rules
//             const breakRules = await this.prisma.breakRules.findMany({
//               where: {
//                 planId: originalPlan.id,
//                 workoutType,
//               },
//             });

//             let twoDayBefore = true;
//             let oneHalfDayBefore = true;
//             let oneDayBefore = true;
//             let oneDayAfter = true;
//             let oneHalfDayAfter = true;
//             let twoDayAfter = true;

//             for (const breakRule of breakRules) {
//               if (breakRule.day === BREAK_RULE_DAYS.TwoDayBefore) {
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//                 const thuMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Thursday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const wedMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Wednesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const wedEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Wednesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const thuMorningWorkoutTypes: string[] = [];
//                 const wedMorningWorkoutTypes: string[] = [];
//                 const wedEveningWorkoutTypes: string[] = [];
//                 if (thuMorning) {
//                   for (const scheduleWorkout of thuMorning?.scheduleWorkouts) {
//                     thuMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (wedMorning) {
//                   for (const scheduleWorkout of wedMorning?.scheduleWorkouts) {
//                     wedMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (wedEvening) {
//                   for (const scheduleWorkout of wedEvening?.scheduleWorkouts) {
//                     wedEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) =>
//                     thuMorningWorkoutTypes.includes(type) ||
//                     wedMorningWorkoutTypes.includes(type) ||
//                     wedEveningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   twoDayBefore = true;
//                 } else {
//                   twoDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayBefore) {
//                 //Monday 1.5 ===> Sat Evening
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const thuMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Thursday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const wedEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Wednesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const thuMorningWorkoutTypes: string[] = [];
//                 const wedEveningWorkoutTypes: string[] = [];

//                 if (thuMorning) {
//                   for (const scheduleWorkout of thuMorning?.scheduleWorkouts) {
//                     thuMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (wedEvening) {
//                   for (const scheduleWorkout of wedEvening?.scheduleWorkouts) {
//                     wedEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) => thuMorningWorkoutTypes.includes(type) || wedEveningWorkoutTypes.includes(type),
//                 );

//                 if (!isWorkoutTypeInSchedule) {
//                   oneHalfDayBefore = true;
//                   //means no break
//                 } else {
//                   oneHalfDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneDayBefore) {
//                 //Monday 1 ===> Sun Morning

//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const thuMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Wednesday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const thuMorningWorkoutTypes: string[] = [];

//                 if (thuMorning) {
//                   for (const scheduleWorkout of thuMorning?.scheduleWorkouts) {
//                     thuMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                   thuMorningWorkoutTypes.includes(type),
//                 );

//                 if (!isWorkoutTypeInSchedule) {
//                   oneDayBefore = true;
//                   //means no break
//                 } else {
//                   oneDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.TwoDayAfter) {
//                 //Monday 2 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const friEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Friday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const friMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Friday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const satMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Saturday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const friMorningWorkoutTypes: string[] = [];
//                 const friEveningWorkoutTypes: string[] = [];
//                 const satMorningWorkoutTypes: string[] = [];
//                 if (friMorning) {
//                   for (const scheduleWorkout of friMorning?.scheduleWorkouts) {
//                     friMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (friEvening) {
//                   for (const scheduleWorkout of friEvening?.scheduleWorkouts) {
//                     friEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (satMorning) {
//                   for (const scheduleWorkout of satMorning?.scheduleWorkouts) {
//                     satMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) =>
//                     friMorningWorkoutTypes.includes(type) ||
//                     friEveningWorkoutTypes.includes(type) ||
//                     satMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   twoDayAfter = true;
//                 } else {
//                   twoDayAfter = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayAfter) {
//                 //Monday 1.5 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const friMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Friday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const friEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Friday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const friEveningWorkoutTypes: string[] = [];
//                 const friMorningWorkoutTypes: string[] = [];
//                 if (friEvening) {
//                   for (const scheduleWorkout of friEvening?.scheduleWorkouts) {
//                     friEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 if (friMorning) {
//                   for (const scheduleWorkout of friMorning?.scheduleWorkouts) {
//                     friMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) => friEveningWorkoutTypes.includes(type) || friMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   oneHalfDayAfter = true;
//                 } else {
//                   oneHalfDayAfter = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneDayAfter) {
//                 //Monday 2 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//                 const friMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Friday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const friMorningWorkoutTypes: string[] = [];
//                 if (friMorning) {
//                   for (const scheduleWorkout of friMorning?.scheduleWorkouts) {
//                     friMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                   friMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   oneDayAfter = true;
//                 } else {
//                   oneDayAfter = false;
//                 }
//               }
//             }

//             if (
//               twoDayBefore &&
//               oneHalfDayBefore &&
//               oneDayBefore &&
//               oneDayAfter &&
//               oneDayAfter &&
//               oneHalfDayAfter &&
//               twoDayAfter
//             ) {
//               const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
//                 where: {
//                   planId: originalPlan.id,
//                 },
//               });

//               const lowIntensityWorkoutTypes = lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes;

//               if (lowIntensityWorkoutTypes) {
//                 const lowIntensityRules = await this.prisma.lowIntensityRules.findMany({
//                   where: {
//                     planId: originalPlan.id,
//                   },
//                 });

//                 let lowIntensityCounter = 0;
//                 let restDayCounter = 0;
//                 for (const lowIntensityRule of lowIntensityRules) {
//                   const { ifClauses, thenClause } = lowIntensityRule;

//                   const backTrack = ifClauses.length;

//                   if (lowIntensityCounter !== 1 || restDayCounter !== 1) {
//                     if (backTrack === 1) {
//                       //Monday Mor ===> Sunday Even
//                       if (
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                       ) {
//                         const highIntensityWorkoutType = ifClauses[0];
//                         const wednesdayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Wednesday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const wednesdayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Wednesday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const wednesdayEveningWorkoutTypes: string[] = [];
//                         const wednesdayMorningWorkoutTypes: string[] = [];

//                         if (wednesdayEvening) {
//                           for (const scheduleWorkout of wednesdayEvening.scheduleWorkouts) {
//                             wednesdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (wednesdayMorning) {
//                           for (const scheduleWorkout of wednesdayMorning.scheduleWorkouts) {
//                             wednesdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         // Check if highIntensityWorkoutType is in sundayEveningWorkoutTypes or sundayMorningWorkoutTypes
//                         const isHighWorkoutTypeInEvening =
//                           wednesdayEveningWorkoutTypes.includes(highIntensityWorkoutType);
//                         const isHighWorkoutTypeInMorning =
//                           wednesdayMorningWorkoutTypes.includes(highIntensityWorkoutType);

//                         if (isHighWorkoutTypeInEvening || isHighWorkoutTypeInMorning) {
//                           if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                             lowIntensityCounter = 1;
//                             counter = counter + 1;

//                             const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                             // Select one workout type randomly
//                             const randomLowIntensityWorkoutType =
//                               shuffledLowIntensityWorkoutTypes[
//                                 Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                               ];

//                             //check combination rules as well to see if anything comes before or after

//                             await this.handleCombinations(
//                               originalPlan,
//                               randomLowIntensityWorkoutType,
//                               userPlan,
//                               DAY.Thursday,
//                               GYM_SESSION.Evening,
//                               daysOfWeek,
//                             );
//                           } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                             //increment restDay counter
//                             highIntensityRestDay.set(DAY.Thursday, highIntensityRestDay.get(DAY.Thursday) + 1);
//                             restDayCounter = 1;
//                           }
//                         }
//                       }
//                     } else if (backTrack === 2) {
//                       //Monday Mor ===> Sat Mor, Sat Even, Sun Mor, Sun Even
//                       if (
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay &&
//                         ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                       ) {
//                         const highIntensityWorkoutTypeOne = ifClauses[0];
//                         const highIntensityWorkoutTypeTwo = ifClauses[1];

//                         const wednesdayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Wednesday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const wednesdayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Wednesday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const tuesdayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Tuesday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const tuesdayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Tuesday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const wednesdayEveningWorkoutTypes: string[] = [];
//                         const wednesdayMorningWorkoutTypes: string[] = [];
//                         const tuesdayEveningWorkoutTypes: string[] = [];
//                         const tuesdayMorningWorkoutTypes: string[] = [];

//                         if (wednesdayEvening) {
//                           for (const scheduleWorkout of wednesdayEvening.scheduleWorkouts) {
//                             wednesdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (wednesdayMorning) {
//                           for (const scheduleWorkout of wednesdayMorning.scheduleWorkouts) {
//                             wednesdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (tuesdayEvening) {
//                           for (const scheduleWorkout of tuesdayEvening.scheduleWorkouts) {
//                             tuesdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (tuesdayMorning) {
//                           for (const scheduleWorkout of tuesdayMorning.scheduleWorkouts) {
//                             tuesdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         // Check if highIntensityWorkoutTypeOne is in both Saturday and Sunday
//                         const isHighWorkoutTypeOneInTuesday =
//                           tuesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                           tuesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                         const isHighWorkoutTypeOneInWednesday =
//                           wednesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                           wednesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                         // Check if highIntensityWorkoutTypeTwo is in both Saturday and Sunday
//                         const isHighWorkoutTypeTwoInTuesday =
//                           tuesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                           tuesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                         const isHighWorkoutTypeTwoInWednesday =
//                           wednesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                           wednesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                         // Trigger logic if both high-intensity workouts are scheduled on consecutive days
//                         if (
//                           (isHighWorkoutTypeOneInTuesday || isHighWorkoutTypeOneInWednesday) &&
//                           (isHighWorkoutTypeTwoInTuesday || isHighWorkoutTypeTwoInWednesday)
//                         ) {
//                           if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                             counter = counter + 1;
//                             lowIntensityCounter = 1;

//                             const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                             // Select one workout type randomly
//                             const randomLowIntensityWorkoutType =
//                               shuffledLowIntensityWorkoutTypes[
//                                 Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                               ];

//                             let lowIntensityWorkoutCount = 0;
//                             //check combination rules as well to see if anything comes before or after

//                             await this.handleCombinations(
//                               originalPlan,
//                               randomLowIntensityWorkoutType,
//                               userPlan,
//                               DAY.Thursday,
//                               GYM_SESSION.Evening,
//                               daysOfWeek,
//                             );
//                           } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                             //increment restDay counter
//                             highIntensityRestDay.set(DAY.Thursday, highIntensityRestDay.get(DAY.Thursday) + 1);
//                             restDayCounter = 1;
//                           }
//                         }
//                       }
//                     } else if (backTrack === 3) {
//                       const highIntensityWorkoutTypeOne = ifClauses[0];
//                       const highIntensityWorkoutTypeTwo = ifClauses[1];
//                       const highIntensityWorkoutTypeThree = ifClauses[2];

//                       const mondayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Monday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const mondayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Monday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const tuesdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Tuesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const tuesdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Tuesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const wednesdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Wednesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const wednesdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Wednesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const mondayWorkoutTypes: string[] = [];
//                       const tuesdayWorkoutTypes: string[] = [];
//                       const wednesdayWorkoutTypes: string[] = [];

//                       if (mondayEvening) {
//                         for (const scheduleWorkout of mondayEvening.scheduleWorkouts) {
//                           mondayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (mondayMorning) {
//                         for (const scheduleWorkout of mondayMorning.scheduleWorkouts) {
//                           mondayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (tuesdayEvening) {
//                         for (const scheduleWorkout of tuesdayEvening.scheduleWorkouts) {
//                           tuesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (tuesdayMorning) {
//                         for (const scheduleWorkout of tuesdayMorning.scheduleWorkouts) {
//                           tuesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (wednesdayEvening) {
//                         for (const scheduleWorkout of wednesdayEvening.scheduleWorkouts) {
//                           wednesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (wednesdayMorning) {
//                         for (const scheduleWorkout of wednesdayMorning.scheduleWorkouts) {
//                           wednesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       const allWorkoutTypes = [
//                         ...mondayWorkoutTypes,
//                         ...tuesdayWorkoutTypes,
//                         ...wednesdayWorkoutTypes,
//                       ];

//                       // Check if all high-intensity workout types are present across Friday, Saturday, and Sunday
//                       const hasHighIntensityWorkouts =
//                         allWorkoutTypes.includes(highIntensityWorkoutTypeOne) &&
//                         allWorkoutTypes.includes(highIntensityWorkoutTypeTwo) &&
//                         allWorkoutTypes.includes(highIntensityWorkoutTypeThree);

//                       if (hasHighIntensityWorkouts) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           counter = counter + 1;
//                           lowIntensityCounter = 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           let lowIntensityWorkoutCount = 0;
//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];
//                           //check combination rules as well to see if anything comes before or after

//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Thursday,
//                             GYM_SESSION.Evening,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Thursday, highIntensityRestDay.get(DAY.Thursday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   }
//                 }
//                 if (lowIntensityCounter === 0 && restDayCounter === 0) {
//                   workoutOccurrence = workoutOccurrence + 1;
//                   counter = counter + 1;

//                   //check combination rules as well to see if anything comes before or after

//                   await this.handleCombinations(
//                     originalPlan,
//                     workoutType,
//                     userPlan,
//                     DAY.Thursday,
//                     GYM_SESSION.Evening,
//                     daysOfWeek,
//                   );
//                 }
//               } else {
//                 workoutOccurrence = workoutOccurrence + 1;
//                 counter = counter + 1;

//                 //check combination rules as well to see if anything comes before or after

//                 await this.handleCombinations(
//                   originalPlan,
//                   workoutType,
//                   userPlan,
//                   DAY.Thursday,
//                   GYM_SESSION.Evening,
//                   daysOfWeek,
//                 );
//               }
//             }
//           }
//         }
//       }
//     }
//   } else if (weekDaySetting.day === DAY.Friday) {
//     if (this.countConsecutiveNonZeroDays(daysOfWeek, DAY.Friday) !== restDays) {
//       if (weekDaySetting.session === GYM_SESSION.Morning) {
//         const exist = await this.prisma.planSchedule.findUnique({
//           where: {
//             week_day_gymSession_planId: {
//               week: 1,
//               planId: userPlan.planId,
//               gymSession: GYM_SESSION.Morning,
//               day: DAY.Friday,
//             },
//           },
//           include: {
//             scheduleWorkouts: {
//               include: {
//                 workout: true,
//               },
//             },
//           },
//         });

//         if (!exist) {
//           //check break rules
//           const breakRules = await this.prisma.breakRules.findMany({
//             where: {
//               planId: originalPlan.id,
//               workoutType,
//             },
//           });

//           let twoDayBefore = true;
//           let oneHalfDayBefore = true;
//           let oneDayBefore = true;
//           let oneDayAfter = true;
//           let oneHalfDayAfter = true;
//           let twoDayAfter = true;

//           for (const breakRule of breakRules) {
//             if (breakRule.day === BREAK_RULE_DAYS.TwoDayBefore) {
//               //Monday 2 ===> Sat Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//               const thuEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Thursday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const thuMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Thursday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const wedEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Wednesday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const thuEveningWorkoutTypes: string[] = [];
//               const thuMorningWorkoutTypes: string[] = [];
//               const wedEveningWorkoutTypes: string[] = [];
//               if (thuEvening) {
//                 for (const scheduleWorkout of thuEvening?.scheduleWorkouts) {
//                   thuEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (thuMorning) {
//                 for (const scheduleWorkout of thuMorning?.scheduleWorkouts) {
//                   thuMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (wedEvening) {
//                 for (const scheduleWorkout of wedEvening?.scheduleWorkouts) {
//                   wedEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) =>
//                   thuEveningWorkoutTypes.includes(type) ||
//                   thuMorningWorkoutTypes.includes(type) ||
//                   wedEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 twoDayBefore = true;
//               } else {
//                 twoDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayBefore) {
//               //Monday 1.5 ===> Sat Evening
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const thuMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Thursday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const thuEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Thursday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const thuMorningWorkoutTypes: string[] = [];
//               const thuEveningWorkoutTypes: string[] = [];

//               if (thuMorning) {
//                 for (const scheduleWorkout of thuMorning?.scheduleWorkouts) {
//                   thuMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (thuEvening) {
//                 for (const scheduleWorkout of thuEvening?.scheduleWorkouts) {
//                   thuEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) => thuMorningWorkoutTypes.includes(type) || thuEveningWorkoutTypes.includes(type),
//               );

//               if (!isWorkoutTypeInSchedule) {
//                 oneHalfDayBefore = true;
//                 //means no break
//               } else {
//                 oneHalfDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneDayBefore) {
//               //Monday 1 ===> Sun Morning

//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const thuEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Thursday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const thuEveningWorkoutTypes: string[] = [];

//               if (thuEvening) {
//                 for (const scheduleWorkout of thuEvening?.scheduleWorkouts) {
//                   thuEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 thuEveningWorkoutTypes.includes(type),
//               );

//               if (!isWorkoutTypeInSchedule) {
//                 oneDayBefore = true;
//                 //means no break
//               } else {
//                 oneDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.TwoDayAfter) {
//               //Monday 2 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const friEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Friday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const satMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Saturday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const satEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Saturday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const friEveningWorkoutTypes: string[] = [];
//               const satMorningWorkoutTypes: string[] = [];
//               const satEveningWorkoutTypes: string[] = [];
//               if (friEvening) {
//                 for (const scheduleWorkout of friEvening?.scheduleWorkouts) {
//                   friEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (satMorning) {
//                 for (const scheduleWorkout of satMorning?.scheduleWorkouts) {
//                   satMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (satEvening) {
//                 for (const scheduleWorkout of satEvening?.scheduleWorkouts) {
//                   satEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) =>
//                   friEveningWorkoutTypes.includes(type) ||
//                   satMorningWorkoutTypes.includes(type) ||
//                   satEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 twoDayAfter = true;
//               } else {
//                 twoDayAfter = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayAfter) {
//               //Monday 1.5 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const satMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Saturday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const friEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Friday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const friEveningWorkoutTypes: string[] = [];
//               const satMorningWorkoutTypes: string[] = [];
//               if (friEvening) {
//                 for (const scheduleWorkout of friEvening?.scheduleWorkouts) {
//                   friEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               if (satMorning) {
//                 for (const scheduleWorkout of satMorning?.scheduleWorkouts) {
//                   satMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) => friEveningWorkoutTypes.includes(type) || satMorningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 oneHalfDayAfter = true;
//               } else {
//                 oneHalfDayAfter = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneDayAfter) {
//               //Monday 2 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//               const friEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Friday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const friEveningWorkoutTypes: string[] = [];
//               if (friEvening) {
//                 for (const scheduleWorkout of friEvening?.scheduleWorkouts) {
//                   friEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 friEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 oneDayAfter = true;
//               } else {
//                 oneDayAfter = false;
//               }
//             }
//           }

//           if (
//             twoDayBefore &&
//             oneHalfDayBefore &&
//             oneDayBefore &&
//             oneDayAfter &&
//             oneDayAfter &&
//             oneHalfDayAfter &&
//             twoDayAfter
//           ) {
//             //now check low intensity rules
//             const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
//               where: {
//                 planId: originalPlan.id,
//               },
//             });

//             const lowIntensityWorkoutTypes = lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes;

//             if (lowIntensityWorkoutTypes) {
//               const lowIntensityRules = await this.prisma.lowIntensityRules.findMany({
//                 where: {
//                   planId: originalPlan.id,
//                 },
//               });

//               let lowIntensityCounter = 0;
//               let restDayCounter = 0;
//               for (const lowIntensityRule of lowIntensityRules) {
//                 const { ifClauses, thenClause } = lowIntensityRule;

//                 const backTrack = ifClauses.length;

//                 if (lowIntensityCounter !== 1 || restDayCounter !== 1) {
//                   if (backTrack === 1) {
//                     //Monday Mor ===> Sunday Even
//                     if (
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                     ) {
//                       const highIntensityWorkoutType = ifClauses[0];
//                       const thursdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Thursday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const thursdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Thursday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const thursdayEveningWorkoutTypes: string[] = [];
//                       const thursdayMorningWorkoutTypes: string[] = [];

//                       if (thursdayEvening) {
//                         for (const scheduleWorkout of thursdayEvening.scheduleWorkouts) {
//                           thursdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (thursdayMorning) {
//                         for (const scheduleWorkout of thursdayMorning.scheduleWorkouts) {
//                           thursdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       // Check if highIntensityWorkoutType is in sundayEveningWorkoutTypes or sundayMorningWorkoutTypes
//                       const isHighWorkoutTypeInEvening =
//                         thursdayEveningWorkoutTypes.includes(highIntensityWorkoutType);
//                       const isHighWorkoutTypeInMorning =
//                         thursdayMorningWorkoutTypes.includes(highIntensityWorkoutType);

//                       if (isHighWorkoutTypeInEvening || isHighWorkoutTypeInMorning) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           lowIntensityCounter = 1;
//                           counter = counter + 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];

//                           //check combination rules as well to see if anything comes before or after

//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Friday,
//                             GYM_SESSION.Morning,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Friday, highIntensityRestDay.get(DAY.Friday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   } else if (backTrack === 2) {
//                     //Monday Mor ===> Sat Mor, Sat Even, Sun Mor, Sun Even
//                     if (
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay &&
//                       ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                     ) {
//                       const highIntensityWorkoutTypeOne = ifClauses[0];
//                       const highIntensityWorkoutTypeTwo = ifClauses[1];

//                       const thursdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Thursday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const thursdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Thursday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const wednesdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Wednesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const wednesdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Wednesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const thursdayEveningWorkoutTypes: string[] = [];
//                       const thursdayMorningWorkoutTypes: string[] = [];
//                       const wednesdayEveningWorkoutTypes: string[] = [];
//                       const wednesdayMorningWorkoutTypes: string[] = [];

//                       if (thursdayEvening) {
//                         for (const scheduleWorkout of thursdayEvening.scheduleWorkouts) {
//                           thursdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (thursdayMorning) {
//                         for (const scheduleWorkout of thursdayMorning.scheduleWorkouts) {
//                           thursdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (wednesdayEvening) {
//                         for (const scheduleWorkout of wednesdayEvening.scheduleWorkouts) {
//                           wednesdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (wednesdayMorning) {
//                         for (const scheduleWorkout of wednesdayMorning.scheduleWorkouts) {
//                           wednesdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       // Check if highIntensityWorkoutTypeOne is in both Saturday and Sunday
//                       const isHighWorkoutTypeOneInWednesday =
//                         wednesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                         wednesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                       const isHighWorkoutTypeOneInThursday =
//                         thursdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                         thursdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                       // Check if highIntensityWorkoutTypeTwo is in both Saturday and Sunday
//                       const isHighWorkoutTypeTwoInWednesday =
//                         wednesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                         wednesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                       const isHighWorkoutTypeTwoInThursday =
//                         thursdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                         thursdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                       // Trigger logic if both high-intensity workouts are scheduled on consecutive days
//                       if (
//                         (isHighWorkoutTypeOneInWednesday || isHighWorkoutTypeOneInThursday) &&
//                         (isHighWorkoutTypeTwoInWednesday || isHighWorkoutTypeTwoInThursday)
//                       ) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           counter = counter + 1;
//                           lowIntensityCounter = 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];

//                           let lowIntensityWorkoutCount = 0;
//                           //check combination rules as well to see if anything comes before or after

//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Friday,
//                             GYM_SESSION.Morning,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Friday, highIntensityRestDay.get(DAY.Friday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   } else if (backTrack === 3) {
//                     const highIntensityWorkoutTypeOne = ifClauses[0];
//                     const highIntensityWorkoutTypeTwo = ifClauses[1];
//                     const highIntensityWorkoutTypeThree = ifClauses[2];

//                     const tuesdayEvening = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Evening,
//                           day: DAY.Tuesday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const tuesdayMorning = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Morning,
//                           day: DAY.Tuesday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const wednesdayEvening = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Evening,
//                           day: DAY.Wednesday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const wednesdayMorning = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Morning,
//                           day: DAY.Wednesday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const thursdayEvening = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Evening,
//                           day: DAY.Thursday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const thursdayMorning = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Morning,
//                           day: DAY.Thursday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const tuesdayWorkoutTypes: string[] = [];
//                     const wednesdayWorkoutTypes: string[] = [];
//                     const thursdayWorkoutTypes: string[] = [];

//                     if (tuesdayEvening) {
//                       for (const scheduleWorkout of tuesdayEvening.scheduleWorkouts) {
//                         tuesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (tuesdayMorning) {
//                       for (const scheduleWorkout of tuesdayMorning.scheduleWorkouts) {
//                         tuesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (wednesdayEvening) {
//                       for (const scheduleWorkout of wednesdayEvening.scheduleWorkouts) {
//                         wednesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (wednesdayMorning) {
//                       for (const scheduleWorkout of wednesdayMorning.scheduleWorkouts) {
//                         wednesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (thursdayEvening) {
//                       for (const scheduleWorkout of thursdayEvening.scheduleWorkouts) {
//                         thursdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (thursdayMorning) {
//                       for (const scheduleWorkout of thursdayMorning.scheduleWorkouts) {
//                         thursdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     const allWorkoutTypes = [
//                       ...tuesdayWorkoutTypes,
//                       ...wednesdayWorkoutTypes,
//                       ...thursdayWorkoutTypes,
//                     ];

//                     // Check if all high-intensity workout types are present across Friday, Saturday, and Sunday
//                     const hasHighIntensityWorkouts =
//                       allWorkoutTypes.includes(highIntensityWorkoutTypeOne) &&
//                       allWorkoutTypes.includes(highIntensityWorkoutTypeTwo) &&
//                       allWorkoutTypes.includes(highIntensityWorkoutTypeThree);

//                     if (hasHighIntensityWorkouts) {
//                       if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                         counter = counter + 1;
//                         lowIntensityCounter = 1;

//                         const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                         let lowIntensityWorkoutCount = 0;
//                         // Select one workout type randomly
//                         const randomLowIntensityWorkoutType =
//                           shuffledLowIntensityWorkoutTypes[
//                             Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                           ];
//                         //check combination rules as well to see if anything comes before or after

//                         await this.handleCombinations(
//                           originalPlan,
//                           randomLowIntensityWorkoutType,
//                           userPlan,
//                           DAY.Friday,
//                           GYM_SESSION.Morning,
//                           daysOfWeek,
//                         );
//                       } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                         //increment restDay counter
//                         highIntensityRestDay.set(DAY.Friday, highIntensityRestDay.get(DAY.Friday) + 1);
//                         restDayCounter = 1;
//                       }
//                     }
//                   }
//                 }
//               }
//               if (lowIntensityCounter === 0 && restDayCounter === 0) {
//                 workoutOccurrence = workoutOccurrence + 1;
//                 counter = counter + 1;

//                 //check combination rules as well to see if anything comes before or after

//                 await this.handleCombinations(
//                   originalPlan,
//                   workoutType,
//                   userPlan,
//                   DAY.Friday,
//                   GYM_SESSION.Morning,
//                   daysOfWeek,
//                 );
//               }
//             } else {
//               workoutOccurrence = workoutOccurrence + 1;
//               counter = counter + 1;

//               //check combination rules as well to see if anything comes before or after

//               await this.handleCombinations(
//                 originalPlan,
//                 workoutType,
//                 userPlan,
//                 DAY.Friday,
//                 GYM_SESSION.Morning,
//                 daysOfWeek,
//               );
//             }
//           }
//         }
//       } else if (weekDaySetting.session === GYM_SESSION.Evening) {
//         const exist = await this.prisma.planSchedule.findUnique({
//           where: {
//             week_day_gymSession_planId: {
//               week: 1,
//               planId: userPlan.planId,
//               gymSession: GYM_SESSION.Evening,
//               day: DAY.Friday,
//             },
//           },
//           include: {
//             scheduleWorkouts: {
//               include: {
//                 workout: true,
//               },
//             },
//           },
//         });

//         if (highIntensityRestDay.get(DAY.Friday) === 0) {
//           if (!exist) {
//             //check break rules
//             const breakRules = await this.prisma.breakRules.findMany({
//               where: {
//                 planId: originalPlan.id,
//                 workoutType,
//               },
//             });

//             let twoDayBefore = true;
//             let oneHalfDayBefore = true;
//             let oneDayBefore = true;
//             let oneDayAfter = true;
//             let oneHalfDayAfter = true;
//             let twoDayAfter = true;

//             for (const breakRule of breakRules) {
//               if (breakRule.day === BREAK_RULE_DAYS.TwoDayBefore) {
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//                 const friMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Friday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const thuMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Thursday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const thuEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Thursday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const friMorningWorkoutTypes: string[] = [];
//                 const thuMorningWorkoutTypes: string[] = [];
//                 const thuEveningWorkoutTypes: string[] = [];
//                 if (friMorning) {
//                   for (const scheduleWorkout of friMorning?.scheduleWorkouts) {
//                     friMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (thuMorning) {
//                   for (const scheduleWorkout of thuMorning?.scheduleWorkouts) {
//                     thuMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (thuEvening) {
//                   for (const scheduleWorkout of thuEvening?.scheduleWorkouts) {
//                     thuEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) =>
//                     friMorningWorkoutTypes.includes(type) ||
//                     thuMorningWorkoutTypes.includes(type) ||
//                     thuEveningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   twoDayBefore = true;
//                 } else {
//                   twoDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayBefore) {
//                 //Monday 1.5 ===> Sat Evening
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const friMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Friday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const thuEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Thursday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const friMorningWorkoutTypes: string[] = [];
//                 const thuEveningWorkoutTypes: string[] = [];

//                 if (friMorning) {
//                   for (const scheduleWorkout of friMorning?.scheduleWorkouts) {
//                     friMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (thuEvening) {
//                   for (const scheduleWorkout of thuEvening?.scheduleWorkouts) {
//                     thuEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) => friMorningWorkoutTypes.includes(type) || thuEveningWorkoutTypes.includes(type),
//                 );

//                 if (!isWorkoutTypeInSchedule) {
//                   oneHalfDayBefore = true;
//                   //means no break
//                 } else {
//                   oneHalfDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneDayBefore) {
//                 //Monday 1 ===> Sun Morning

//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const friMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Friday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const friMorningWorkoutTypes: string[] = [];

//                 if (friMorning) {
//                   for (const scheduleWorkout of friMorning?.scheduleWorkouts) {
//                     friMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                   friMorningWorkoutTypes.includes(type),
//                 );

//                 if (!isWorkoutTypeInSchedule) {
//                   oneDayBefore = true;
//                   //means no break
//                 } else {
//                   oneDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.TwoDayAfter) {
//                 //Monday 2 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const satEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Saturday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const satMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Saturday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const sunMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Sunday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const satMorningWorkoutTypes: string[] = [];
//                 const satEveningWorkoutTypes: string[] = [];
//                 const sunMorningWorkoutTypes: string[] = [];
//                 if (satMorning) {
//                   for (const scheduleWorkout of satMorning?.scheduleWorkouts) {
//                     satMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (satEvening) {
//                   for (const scheduleWorkout of satEvening?.scheduleWorkouts) {
//                     satEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (sunMorning) {
//                   for (const scheduleWorkout of sunMorning?.scheduleWorkouts) {
//                     sunMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) =>
//                     satMorningWorkoutTypes.includes(type) ||
//                     satEveningWorkoutTypes.includes(type) ||
//                     satMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   twoDayAfter = true;
//                 } else {
//                   twoDayAfter = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayAfter) {
//                 //Monday 1.5 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const satMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Saturday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const satEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Saturday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const satEveningWorkoutTypes: string[] = [];
//                 const satMorningWorkoutTypes: string[] = [];
//                 if (satEvening) {
//                   for (const scheduleWorkout of satEvening?.scheduleWorkouts) {
//                     satEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 if (satMorning) {
//                   for (const scheduleWorkout of satMorning?.scheduleWorkouts) {
//                     satMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) => satEveningWorkoutTypes.includes(type) || satMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   oneHalfDayAfter = true;
//                 } else {
//                   oneHalfDayAfter = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneDayAfter) {
//                 //Monday 2 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//                 const satMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Saturday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const satMorningWorkoutTypes: string[] = [];
//                 if (satMorning) {
//                   for (const scheduleWorkout of satMorning?.scheduleWorkouts) {
//                     satMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                   satMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   oneDayAfter = true;
//                 } else {
//                   oneDayAfter = false;
//                 }
//               }
//             }

//             if (
//               twoDayBefore &&
//               oneHalfDayBefore &&
//               oneDayBefore &&
//               oneDayAfter &&
//               oneDayAfter &&
//               oneHalfDayAfter &&
//               twoDayAfter
//             ) {
//               const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
//                 where: {
//                   planId: originalPlan.id,
//                 },
//               });

//               const lowIntensityWorkoutTypes = lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes;

//               if (lowIntensityWorkoutTypes) {
//                 const lowIntensityRules = await this.prisma.lowIntensityRules.findMany({
//                   where: {
//                     planId: originalPlan.id,
//                   },
//                 });

//                 let lowIntensityCounter = 0;
//                 let restDayCounter = 0;
//                 for (const lowIntensityRule of lowIntensityRules) {
//                   const { ifClauses, thenClause } = lowIntensityRule;

//                   const backTrack = ifClauses.length;

//                   if (lowIntensityCounter !== 1 || restDayCounter !== 1) {
//                     if (backTrack === 1) {
//                       //Monday Mor ===> Sunday Even
//                       if (
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                       ) {
//                         const highIntensityWorkoutType = ifClauses[0];
//                         const thursdayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Thursday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const thursdayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Thursday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const thursdayEveningWorkoutTypes: string[] = [];
//                         const thursdayMorningWorkoutTypes: string[] = [];

//                         if (thursdayEvening) {
//                           for (const scheduleWorkout of thursdayEvening.scheduleWorkouts) {
//                             thursdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (thursdayMorning) {
//                           for (const scheduleWorkout of thursdayMorning.scheduleWorkouts) {
//                             thursdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         // Check if highIntensityWorkoutType is in sundayEveningWorkoutTypes or sundayMorningWorkoutTypes
//                         const isHighWorkoutTypeInEvening =
//                           thursdayEveningWorkoutTypes.includes(highIntensityWorkoutType);
//                         const isHighWorkoutTypeInMorning =
//                           thursdayMorningWorkoutTypes.includes(highIntensityWorkoutType);

//                         if (isHighWorkoutTypeInEvening || isHighWorkoutTypeInMorning) {
//                           if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                             lowIntensityCounter = 1;
//                             counter = counter + 1;

//                             const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                             // Select one workout type randomly
//                             const randomLowIntensityWorkoutType =
//                               shuffledLowIntensityWorkoutTypes[
//                                 Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                               ];

//                             //check combination rules as well to see if anything comes before or after

//                             await this.handleCombinations(
//                               originalPlan,
//                               randomLowIntensityWorkoutType,
//                               userPlan,
//                               DAY.Friday,
//                               GYM_SESSION.Evening,
//                               daysOfWeek,
//                             );
//                           } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                             //increment restDay counter
//                             highIntensityRestDay.set(DAY.Friday, highIntensityRestDay.get(DAY.Friday) + 1);
//                             restDayCounter = 1;
//                           }
//                         }
//                       }
//                     } else if (backTrack === 2) {
//                       //Monday Mor ===> Sat Mor, Sat Even, Sun Mor, Sun Even
//                       if (
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay &&
//                         ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                       ) {
//                         const highIntensityWorkoutTypeOne = ifClauses[0];
//                         const highIntensityWorkoutTypeTwo = ifClauses[1];

//                         const thursdayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Thursday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const thursdayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Thursday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const wednesdayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Wednesday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const wednesdayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Wednesday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const thursdayEveningWorkoutTypes: string[] = [];
//                         const thursdayMorningWorkoutTypes: string[] = [];
//                         const wednesdayEveningWorkoutTypes: string[] = [];
//                         const wednesdayMorningWorkoutTypes: string[] = [];

//                         if (thursdayEvening) {
//                           for (const scheduleWorkout of thursdayEvening.scheduleWorkouts) {
//                             thursdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (thursdayMorning) {
//                           for (const scheduleWorkout of thursdayMorning.scheduleWorkouts) {
//                             thursdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (wednesdayEvening) {
//                           for (const scheduleWorkout of wednesdayEvening.scheduleWorkouts) {
//                             wednesdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (wednesdayMorning) {
//                           for (const scheduleWorkout of wednesdayMorning.scheduleWorkouts) {
//                             wednesdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         // Check if highIntensityWorkoutTypeOne is in both Saturday and Sunday
//                         const isHighWorkoutTypeOneInWednesday =
//                           wednesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                           wednesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                         const isHighWorkoutTypeOneInThursday =
//                           thursdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                           thursdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                         // Check if highIntensityWorkoutTypeTwo is in both Saturday and Sunday
//                         const isHighWorkoutTypeTwoInWednesday =
//                           wednesdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                           wednesdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                         const isHighWorkoutTypeTwoInThursday =
//                           thursdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                           thursdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                         // Trigger logic if both high-intensity workouts are scheduled on consecutive days
//                         if (
//                           (isHighWorkoutTypeOneInWednesday || isHighWorkoutTypeOneInThursday) &&
//                           (isHighWorkoutTypeTwoInWednesday || isHighWorkoutTypeTwoInThursday)
//                         ) {
//                           if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                             counter = counter + 1;
//                             lowIntensityCounter = 1;

//                             const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                             // Select one workout type randomly
//                             const randomLowIntensityWorkoutType =
//                               shuffledLowIntensityWorkoutTypes[
//                                 Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                               ];

//                             let lowIntensityWorkoutCount = 0;
//                             //check combination rules as well to see if anything comes before or after

//                             await this.handleCombinations(
//                               originalPlan,
//                               randomLowIntensityWorkoutType,
//                               userPlan,
//                               DAY.Friday,
//                               GYM_SESSION.Evening,
//                               daysOfWeek,
//                             );
//                           } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                             //increment restDay counter
//                             highIntensityRestDay.set(DAY.Friday, highIntensityRestDay.get(DAY.Friday) + 1);
//                             restDayCounter = 1;
//                           }
//                         }
//                       }
//                     } else if (backTrack === 3) {
//                       const highIntensityWorkoutTypeOne = ifClauses[0];
//                       const highIntensityWorkoutTypeTwo = ifClauses[1];
//                       const highIntensityWorkoutTypeThree = ifClauses[2];

//                       const tuesdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Tuesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const tuesdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Tuesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const wednesdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Wednesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const wednesdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Wednesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const thursdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Thursday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const thursdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Thursday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const tuesdayWorkoutTypes: string[] = [];
//                       const wednesdayWorkoutTypes: string[] = [];
//                       const thursdayWorkoutTypes: string[] = [];

//                       if (tuesdayEvening) {
//                         for (const scheduleWorkout of tuesdayEvening.scheduleWorkouts) {
//                           tuesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (tuesdayMorning) {
//                         for (const scheduleWorkout of tuesdayMorning.scheduleWorkouts) {
//                           tuesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (wednesdayEvening) {
//                         for (const scheduleWorkout of wednesdayEvening.scheduleWorkouts) {
//                           wednesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (wednesdayMorning) {
//                         for (const scheduleWorkout of wednesdayMorning.scheduleWorkouts) {
//                           wednesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (thursdayEvening) {
//                         for (const scheduleWorkout of thursdayEvening.scheduleWorkouts) {
//                           thursdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (thursdayMorning) {
//                         for (const scheduleWorkout of thursdayMorning.scheduleWorkouts) {
//                           thursdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       const allWorkoutTypes = [
//                         ...tuesdayWorkoutTypes,
//                         ...wednesdayWorkoutTypes,
//                         ...thursdayWorkoutTypes,
//                       ];

//                       // Check if all high-intensity workout types are present across Friday, Saturday, and Sunday
//                       const hasHighIntensityWorkouts =
//                         allWorkoutTypes.includes(highIntensityWorkoutTypeOne) &&
//                         allWorkoutTypes.includes(highIntensityWorkoutTypeTwo) &&
//                         allWorkoutTypes.includes(highIntensityWorkoutTypeThree);

//                       if (hasHighIntensityWorkouts) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           counter = counter + 1;
//                           lowIntensityCounter = 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           let lowIntensityWorkoutCount = 0;
//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];
//                           //check combination rules as well to see if anything comes before or after

//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Friday,
//                             GYM_SESSION.Evening,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Friday, highIntensityRestDay.get(DAY.Friday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   }
//                 }
//                 if (lowIntensityCounter === 0 && restDayCounter === 0) {
//                   workoutOccurrence = workoutOccurrence + 1;
//                   counter = counter + 1;

//                   //check combination rules as well to see if anything comes before or after

//                   await this.handleCombinations(
//                     originalPlan,
//                     workoutType,
//                     userPlan,
//                     DAY.Friday,
//                     GYM_SESSION.Evening,
//                     daysOfWeek,
//                   );
//                 }
//               } else {
//                 workoutOccurrence = workoutOccurrence + 1;
//                 counter = counter + 1;

//                 //check combination rules as well to see if anything comes before or after

//                 await this.handleCombinations(
//                   originalPlan,
//                   workoutType,
//                   userPlan,
//                   DAY.Friday,
//                   GYM_SESSION.Evening,
//                   daysOfWeek,
//                 );
//               }
//             }
//           }
//         }
//       }
//     }
//   } else if (weekDaySetting.day === DAY.Saturday) {
//     if (this.countConsecutiveNonZeroDays(daysOfWeek, DAY.Saturday) !== restDays) {
//       if (weekDaySetting.session === GYM_SESSION.Morning) {
//         const exist = await this.prisma.planSchedule.findUnique({
//           where: {
//             week_day_gymSession_planId: {
//               week: 1,
//               planId: userPlan.planId,
//               gymSession: GYM_SESSION.Morning,
//               day: DAY.Saturday,
//             },
//           },
//           include: {
//             scheduleWorkouts: {
//               include: {
//                 workout: true,
//               },
//             },
//           },
//         });

//         if (!exist) {
//           //check break rules
//           const breakRules = await this.prisma.breakRules.findMany({
//             where: {
//               planId: originalPlan.id,
//               workoutType,
//             },
//           });

//           let twoDayBefore = true;
//           let oneHalfDayBefore = true;
//           let oneDayBefore = true;
//           let oneDayAfter = true;
//           let oneHalfDayAfter = true;
//           let twoDayAfter = true;

//           for (const breakRule of breakRules) {
//             if (breakRule.day === BREAK_RULE_DAYS.TwoDayBefore) {
//               //Monday 2 ===> Sat Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//               const friEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Friday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const friMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Friday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const thuEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Thursday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const friEveningWorkoutTypes: string[] = [];
//               const friMorningWorkoutTypes: string[] = [];
//               const thuEveningWorkoutTypes: string[] = [];
//               if (friEvening) {
//                 for (const scheduleWorkout of friEvening?.scheduleWorkouts) {
//                   friEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (friMorning) {
//                 for (const scheduleWorkout of friMorning?.scheduleWorkouts) {
//                   friMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (thuEvening) {
//                 for (const scheduleWorkout of thuEvening?.scheduleWorkouts) {
//                   thuEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) =>
//                   friEveningWorkoutTypes.includes(type) ||
//                   friMorningWorkoutTypes.includes(type) ||
//                   thuEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 twoDayBefore = true;
//               } else {
//                 twoDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayBefore) {
//               //Monday 1.5 ===> Sat Evening
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const friMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Friday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const friEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Friday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const friMorningWorkoutTypes: string[] = [];
//               const friEveningWorkoutTypes: string[] = [];

//               if (friMorning) {
//                 for (const scheduleWorkout of friMorning?.scheduleWorkouts) {
//                   friMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (friEvening) {
//                 for (const scheduleWorkout of friEvening?.scheduleWorkouts) {
//                   friEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) => friMorningWorkoutTypes.includes(type) || friEveningWorkoutTypes.includes(type),
//               );

//               if (!isWorkoutTypeInSchedule) {
//                 oneHalfDayBefore = true;
//                 //means no break
//               } else {
//                 oneHalfDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneDayBefore) {
//               //Monday 1 ===> Sun Morning

//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const friEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Friday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const friEveningWorkoutTypes: string[] = [];

//               if (friEvening) {
//                 for (const scheduleWorkout of friEvening?.scheduleWorkouts) {
//                   friEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 friEveningWorkoutTypes.includes(type),
//               );

//               if (!isWorkoutTypeInSchedule) {
//                 oneDayBefore = true;
//                 //means no break
//               } else {
//                 oneDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.TwoDayAfter) {
//               //Monday 2 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const satEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Saturday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const sunMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Sunday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const sunEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Sunday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const satEveningWorkoutTypes: string[] = [];
//               const sunMorningWorkoutTypes: string[] = [];
//               const sunEveningWorkoutTypes: string[] = [];
//               if (satEvening) {
//                 for (const scheduleWorkout of satEvening?.scheduleWorkouts) {
//                   satEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (sunMorning) {
//                 for (const scheduleWorkout of sunMorning?.scheduleWorkouts) {
//                   sunMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (sunEvening) {
//                 for (const scheduleWorkout of sunEvening?.scheduleWorkouts) {
//                   sunEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) =>
//                   satEveningWorkoutTypes.includes(type) ||
//                   sunMorningWorkoutTypes.includes(type) ||
//                   sunEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 twoDayAfter = true;
//               } else {
//                 twoDayAfter = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayAfter) {
//               //Monday 1.5 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const sunMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Sunday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const satEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Saturday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const satEveningWorkoutTypes: string[] = [];
//               const sunMorningWorkoutTypes: string[] = [];
//               if (satEvening) {
//                 for (const scheduleWorkout of satEvening?.scheduleWorkouts) {
//                   satEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               if (sunMorning) {
//                 for (const scheduleWorkout of sunMorning?.scheduleWorkouts) {
//                   sunMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) => satEveningWorkoutTypes.includes(type) || sunMorningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 oneHalfDayAfter = true;
//               } else {
//                 oneHalfDayAfter = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneDayAfter) {
//               //Monday 2 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//               const satEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Saturday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const satEveningWorkoutTypes: string[] = [];
//               if (satEvening) {
//                 for (const scheduleWorkout of satEvening?.scheduleWorkouts) {
//                   satEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 satEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 oneDayAfter = true;
//               } else {
//                 oneDayAfter = false;
//               }
//             }
//           }

//           if (
//             twoDayBefore &&
//             oneHalfDayBefore &&
//             oneDayBefore &&
//             oneDayAfter &&
//             oneDayAfter &&
//             oneHalfDayAfter &&
//             twoDayAfter
//           ) {
//             //now check low intensity rules
//             const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
//               where: {
//                 planId: originalPlan.id,
//               },
//             });

//             const lowIntensityWorkoutTypes = lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes;

//             if (lowIntensityWorkoutTypes) {
//               const lowIntensityRules = await this.prisma.lowIntensityRules.findMany({
//                 where: {
//                   planId: originalPlan.id,
//                 },
//               });

//               let lowIntensityCounter = 0;
//               let restDayCounter = 0;
//               for (const lowIntensityRule of lowIntensityRules) {
//                 const { ifClauses, thenClause } = lowIntensityRule;

//                 const backTrack = ifClauses.length;

//                 if (lowIntensityCounter !== 1 || restDayCounter !== 1) {
//                   if (backTrack === 1) {
//                     //Monday Mor ===> Sunday Even
//                     if (
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                     ) {
//                       const highIntensityWorkoutType = ifClauses[0];
//                       const fridayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Friday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const fridayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Friday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const fridayEveningWorkoutTypes: string[] = [];
//                       const fridayMorningWorkoutTypes: string[] = [];

//                       if (fridayEvening) {
//                         for (const scheduleWorkout of fridayEvening.scheduleWorkouts) {
//                           fridayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (fridayMorning) {
//                         for (const scheduleWorkout of fridayMorning.scheduleWorkouts) {
//                           fridayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       // Check if highIntensityWorkoutType is in sundayEveningWorkoutTypes or sundayMorningWorkoutTypes
//                       const isHighWorkoutTypeInEvening =
//                         fridayEveningWorkoutTypes.includes(highIntensityWorkoutType);
//                       const isHighWorkoutTypeInMorning =
//                         fridayMorningWorkoutTypes.includes(highIntensityWorkoutType);

//                       if (isHighWorkoutTypeInEvening || isHighWorkoutTypeInMorning) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           lowIntensityCounter = 1;
//                           counter = counter + 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];

//                           //check combination rules as well to see if anything comes before or after
//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Saturday,
//                             GYM_SESSION.Morning,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Saturday, highIntensityRestDay.get(DAY.Saturday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   } else if (backTrack === 2) {
//                     //Monday Mor ===> Sat Mor, Sat Even, Sun Mor, Sun Even
//                     if (
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay &&
//                       ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                     ) {
//                       const highIntensityWorkoutTypeOne = ifClauses[0];
//                       const highIntensityWorkoutTypeTwo = ifClauses[1];

//                       const fridayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Friday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const fridayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Friday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const thursdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Thursday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const thursdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Thursday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const fridayEveningWorkoutTypes: string[] = [];
//                       const fridayMorningWorkoutTypes: string[] = [];
//                       const thursdayEveningWorkoutTypes: string[] = [];
//                       const thursdayMorningWorkoutTypes: string[] = [];

//                       if (fridayEvening) {
//                         for (const scheduleWorkout of fridayEvening.scheduleWorkouts) {
//                           fridayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (fridayMorning) {
//                         for (const scheduleWorkout of fridayMorning.scheduleWorkouts) {
//                           fridayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (thursdayEvening) {
//                         for (const scheduleWorkout of thursdayEvening.scheduleWorkouts) {
//                           thursdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (thursdayMorning) {
//                         for (const scheduleWorkout of thursdayMorning.scheduleWorkouts) {
//                           thursdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       // Check if highIntensityWorkoutTypeOne is in both Saturday and Sunday
//                       const isHighWorkoutTypeOneInThursday =
//                         thursdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                         thursdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                       const isHighWorkoutTypeOneInFriday =
//                         fridayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                         fridayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                       // Check if highIntensityWorkoutTypeTwo is in both Saturday and Sunday
//                       const isHighWorkoutTypeTwoInThursday =
//                         thursdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                         thursdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                       const isHighWorkoutTypeTwoInFriday =
//                         fridayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                         fridayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                       // Trigger logic if both high-intensity workouts are scheduled on consecutive days
//                       if (
//                         (isHighWorkoutTypeOneInThursday || isHighWorkoutTypeOneInFriday) &&
//                         (isHighWorkoutTypeTwoInThursday || isHighWorkoutTypeTwoInFriday)
//                       ) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           counter = counter + 1;
//                           lowIntensityCounter = 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];

//                           //check combination rules as well to see if anything comes before or after

//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Saturday,
//                             GYM_SESSION.Morning,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Saturday, highIntensityRestDay.get(DAY.Saturday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   } else if (backTrack === 3) {
//                     const highIntensityWorkoutTypeOne = ifClauses[0];
//                     const highIntensityWorkoutTypeTwo = ifClauses[1];
//                     const highIntensityWorkoutTypeThree = ifClauses[2];

//                     const wednesdayEvening = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Evening,
//                           day: DAY.Wednesday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const wednesdayMorning = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Morning,
//                           day: DAY.Wednesday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const thursdayEvening = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Evening,
//                           day: DAY.Thursday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const thursdayMorning = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Morning,
//                           day: DAY.Thursday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const fridayEvening = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Evening,
//                           day: DAY.Friday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const fridayMorning = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Morning,
//                           day: DAY.Friday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const wednesdayWorkoutTypes: string[] = [];
//                     const thursdayWorkoutTypes: string[] = [];
//                     const fridayWorkoutTypes: string[] = [];

//                     if (wednesdayEvening) {
//                       for (const scheduleWorkout of wednesdayEvening.scheduleWorkouts) {
//                         wednesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (wednesdayMorning) {
//                       for (const scheduleWorkout of wednesdayMorning.scheduleWorkouts) {
//                         wednesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (thursdayEvening) {
//                       for (const scheduleWorkout of thursdayEvening.scheduleWorkouts) {
//                         thursdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (thursdayMorning) {
//                       for (const scheduleWorkout of thursdayMorning.scheduleWorkouts) {
//                         thursdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (fridayEvening) {
//                       for (const scheduleWorkout of fridayEvening.scheduleWorkouts) {
//                         fridayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (fridayMorning) {
//                       for (const scheduleWorkout of fridayMorning.scheduleWorkouts) {
//                         fridayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     const allWorkoutTypes = [
//                       ...wednesdayWorkoutTypes,
//                       ...thursdayWorkoutTypes,
//                       ...fridayWorkoutTypes,
//                     ];

//                     // Check if all high-intensity workout types are present across Friday, Saturday, and Sunday
//                     const hasHighIntensityWorkouts =
//                       allWorkoutTypes.includes(highIntensityWorkoutTypeOne) &&
//                       allWorkoutTypes.includes(highIntensityWorkoutTypeTwo) &&
//                       allWorkoutTypes.includes(highIntensityWorkoutTypeThree);

//                     if (hasHighIntensityWorkouts) {
//                       if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                         counter = counter + 1;
//                         lowIntensityCounter = 1;

//                         const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                         let lowIntensityWorkoutCount = 0;
//                         // Select one workout type randomly
//                         const randomLowIntensityWorkoutType =
//                           shuffledLowIntensityWorkoutTypes[
//                             Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                           ];
//                         //check combination rules as well to see if anything comes before or after
//                         await this.handleCombinations(
//                           originalPlan,
//                           randomLowIntensityWorkoutType,
//                           userPlan,
//                           DAY.Saturday,
//                           GYM_SESSION.Morning,
//                           daysOfWeek,
//                         );
//                       } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                         //increment restDay counter
//                         highIntensityRestDay.set(DAY.Saturday, highIntensityRestDay.get(DAY.Saturday) + 1);
//                         restDayCounter = 1;
//                       }
//                     }
//                   }
//                 }
//               }
//               if (lowIntensityCounter === 0 && restDayCounter === 0) {
//                 workoutOccurrence = workoutOccurrence + 1;
//                 counter = counter + 1;

//                 //check combination rules as well to see if anything comes before or after

//                 await this.handleCombinations(
//                   originalPlan,
//                   workoutType,
//                   userPlan,
//                   DAY.Saturday,
//                   GYM_SESSION.Morning,
//                   daysOfWeek,
//                 );
//               }
//             } else {
//               workoutOccurrence = workoutOccurrence + 1;
//               counter = counter + 1;

//               //check combination rules as well to see if anything comes before or after

//               await this.handleCombinations(
//                 originalPlan,
//                 workoutType,
//                 userPlan,
//                 DAY.Saturday,
//                 GYM_SESSION.Morning,
//                 daysOfWeek,
//               );
//             }
//           }
//         }
//       } else if (weekDaySetting.session === GYM_SESSION.Evening) {
//         const exist = await this.prisma.planSchedule.findUnique({
//           where: {
//             week_day_gymSession_planId: {
//               week: 1,
//               planId: userPlan.planId,
//               gymSession: GYM_SESSION.Evening,
//               day: DAY.Saturday,
//             },
//           },
//           include: {
//             scheduleWorkouts: {
//               include: {
//                 workout: true,
//               },
//             },
//           },
//         });

//         if (highIntensityRestDay.get(DAY.Saturday) === 0) {
//           if (!exist) {
//             //check break rules
//             const breakRules = await this.prisma.breakRules.findMany({
//               where: {
//                 planId: originalPlan.id,
//                 workoutType,
//               },
//             });

//             let twoDayBefore = true;
//             let oneHalfDayBefore = true;
//             let oneDayBefore = true;
//             let oneDayAfter = true;
//             let oneHalfDayAfter = true;
//             let twoDayAfter = true;

//             for (const breakRule of breakRules) {
//               if (breakRule.day === BREAK_RULE_DAYS.TwoDayBefore) {
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//                 const satMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Saturday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const friMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Friday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const friEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Friday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const satMorningWorkoutTypes: string[] = [];
//                 const friMorningWorkoutTypes: string[] = [];
//                 const friEveningWorkoutTypes: string[] = [];
//                 if (satMorning) {
//                   for (const scheduleWorkout of satMorning?.scheduleWorkouts) {
//                     satMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (friMorning) {
//                   for (const scheduleWorkout of friMorning?.scheduleWorkouts) {
//                     friMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (friEvening) {
//                   for (const scheduleWorkout of friEvening?.scheduleWorkouts) {
//                     friEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) =>
//                     satMorningWorkoutTypes.includes(type) ||
//                     friMorningWorkoutTypes.includes(type) ||
//                     friEveningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   twoDayBefore = true;
//                 } else {
//                   twoDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayBefore) {
//                 //Monday 1.5 ===> Sat Evening
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const satMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Saturday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const friEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Friday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const satMorningWorkoutTypes: string[] = [];
//                 const friEveningWorkoutTypes: string[] = [];

//                 if (satMorning) {
//                   for (const scheduleWorkout of satMorning?.scheduleWorkouts) {
//                     satMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (friEvening) {
//                   for (const scheduleWorkout of friEvening?.scheduleWorkouts) {
//                     friEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) => satMorningWorkoutTypes.includes(type) || friEveningWorkoutTypes.includes(type),
//                 );

//                 if (!isWorkoutTypeInSchedule) {
//                   oneHalfDayBefore = true;
//                   //means no break
//                 } else {
//                   oneHalfDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneDayBefore) {
//                 //Monday 1 ===> Sun Morning

//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const satMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Saturday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const satMorningWorkoutTypes: string[] = [];

//                 if (satMorning) {
//                   for (const scheduleWorkout of satMorning?.scheduleWorkouts) {
//                     satMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                   satMorningWorkoutTypes.includes(type),
//                 );

//                 if (!isWorkoutTypeInSchedule) {
//                   oneDayBefore = true;
//                   //means no break
//                 } else {
//                   oneDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.TwoDayAfter) {
//                 //Monday 1.5 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const sunMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Sunday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const sunEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Sunday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const sunEveningWorkoutTypes: string[] = [];
//                 const sunMorningWorkoutTypes: string[] = [];
//                 if (sunEvening) {
//                   for (const scheduleWorkout of sunEvening?.scheduleWorkouts) {
//                     sunEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 if (sunMorning) {
//                   for (const scheduleWorkout of sunMorning?.scheduleWorkouts) {
//                     sunMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) => sunEveningWorkoutTypes.includes(type) || sunMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   twoDayAfter = true;
//                 } else {
//                   twoDayAfter = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayAfter) {
//                 //Monday 1.5 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const sunMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Sunday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const sunEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Sunday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const sunEveningWorkoutTypes: string[] = [];
//                 const sunMorningWorkoutTypes: string[] = [];
//                 if (sunEvening) {
//                   for (const scheduleWorkout of sunEvening?.scheduleWorkouts) {
//                     sunEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 if (sunMorning) {
//                   for (const scheduleWorkout of sunMorning?.scheduleWorkouts) {
//                     sunMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) => sunEveningWorkoutTypes.includes(type) || sunMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   oneHalfDayAfter = true;
//                 } else {
//                   oneHalfDayAfter = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneDayAfter) {
//                 //Monday 2 ===> Wed Morning
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//                 const sunMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Sunday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const sunMorningWorkoutTypes: string[] = [];
//                 if (sunMorning) {
//                   for (const scheduleWorkout of sunMorning?.scheduleWorkouts) {
//                     sunMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                   sunMorningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   oneDayAfter = true;
//                 } else {
//                   oneDayAfter = false;
//                 }
//               }
//             }

//             if (
//               twoDayBefore &&
//               oneHalfDayBefore &&
//               oneDayBefore &&
//               oneDayAfter &&
//               oneDayAfter &&
//               oneHalfDayAfter &&
//               twoDayAfter
//             ) {
//               const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
//                 where: {
//                   planId: originalPlan.id,
//                 },
//               });

//               const lowIntensityWorkoutTypes = lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes;

//               if (lowIntensityWorkoutTypes) {
//                 const lowIntensityRules = await this.prisma.lowIntensityRules.findMany({
//                   where: {
//                     planId: originalPlan.id,
//                   },
//                 });

//                 let lowIntensityCounter = 0;
//                 let restDayCounter = 0;
//                 for (const lowIntensityRule of lowIntensityRules) {
//                   const { ifClauses, thenClause } = lowIntensityRule;

//                   const backTrack = ifClauses.length;

//                   if (lowIntensityCounter !== 1 || restDayCounter !== 1) {
//                     if (backTrack === 1) {
//                       //Monday Mor ===> Sunday Even
//                       if (
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                       ) {
//                         const highIntensityWorkoutType = ifClauses[0];
//                         const fridayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Friday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const fridayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Friday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const fridayEveningWorkoutTypes: string[] = [];
//                         const fridayMorningWorkoutTypes: string[] = [];

//                         if (fridayEvening) {
//                           for (const scheduleWorkout of fridayEvening.scheduleWorkouts) {
//                             fridayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (fridayMorning) {
//                           for (const scheduleWorkout of fridayMorning.scheduleWorkouts) {
//                             fridayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         // Check if highIntensityWorkoutType is in sundayEveningWorkoutTypes or sundayMorningWorkoutTypes
//                         const isHighWorkoutTypeInEvening =
//                           fridayEveningWorkoutTypes.includes(highIntensityWorkoutType);
//                         const isHighWorkoutTypeInMorning =
//                           fridayMorningWorkoutTypes.includes(highIntensityWorkoutType);

//                         if (isHighWorkoutTypeInEvening || isHighWorkoutTypeInMorning) {
//                           if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                             lowIntensityCounter = 1;
//                             counter = counter + 1;

//                             const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                             // Select one workout type randomly
//                             const randomLowIntensityWorkoutType =
//                               shuffledLowIntensityWorkoutTypes[
//                                 Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                               ];

//                             //check combination rules as well to see if anything comes before or after
//                             await this.handleCombinations(
//                               originalPlan,
//                               randomLowIntensityWorkoutType,
//                               userPlan,
//                               DAY.Saturday,
//                               GYM_SESSION.Evening,
//                               daysOfWeek,
//                             );
//                           } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                             //increment restDay counter
//                             highIntensityRestDay.set(DAY.Saturday, highIntensityRestDay.get(DAY.Saturday) + 1);
//                             restDayCounter = 1;
//                           }
//                         }
//                       }
//                     } else if (backTrack === 2) {
//                       //Monday Mor ===> Sat Mor, Sat Even, Sun Mor, Sun Even
//                       if (
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay &&
//                         ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                       ) {
//                         const highIntensityWorkoutTypeOne = ifClauses[0];
//                         const highIntensityWorkoutTypeTwo = ifClauses[1];

//                         const fridayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Friday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const fridayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Friday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const thursdayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Thursday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const thursdayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Thursday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const fridayEveningWorkoutTypes: string[] = [];
//                         const fridayMorningWorkoutTypes: string[] = [];
//                         const thursdayEveningWorkoutTypes: string[] = [];
//                         const thursdayMorningWorkoutTypes: string[] = [];

//                         if (fridayEvening) {
//                           for (const scheduleWorkout of fridayEvening.scheduleWorkouts) {
//                             fridayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (fridayMorning) {
//                           for (const scheduleWorkout of fridayMorning.scheduleWorkouts) {
//                             fridayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (thursdayEvening) {
//                           for (const scheduleWorkout of thursdayEvening.scheduleWorkouts) {
//                             thursdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (thursdayMorning) {
//                           for (const scheduleWorkout of thursdayMorning.scheduleWorkouts) {
//                             thursdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         // Check if highIntensityWorkoutTypeOne is in both Saturday and Sunday
//                         const isHighWorkoutTypeOneInThursday =
//                           thursdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                           thursdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                         const isHighWorkoutTypeOneInFriday =
//                           fridayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                           fridayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                         // Check if highIntensityWorkoutTypeTwo is in both Saturday and Sunday
//                         const isHighWorkoutTypeTwoInThursday =
//                           thursdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                           thursdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                         const isHighWorkoutTypeTwoInFriday =
//                           fridayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                           fridayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                         // Trigger logic if both high-intensity workouts are scheduled on consecutive days
//                         if (
//                           (isHighWorkoutTypeOneInThursday || isHighWorkoutTypeOneInFriday) &&
//                           (isHighWorkoutTypeTwoInThursday || isHighWorkoutTypeTwoInFriday)
//                         ) {
//                           if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                             counter = counter + 1;
//                             lowIntensityCounter = 1;

//                             const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                             // Select one workout type randomly
//                             const randomLowIntensityWorkoutType =
//                               shuffledLowIntensityWorkoutTypes[
//                                 Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                               ];

//                             //check combination rules as well to see if anything comes before or after
//                             await this.handleCombinations(
//                               originalPlan,
//                               randomLowIntensityWorkoutType,
//                               userPlan,
//                               DAY.Saturday,
//                               GYM_SESSION.Evening,
//                               daysOfWeek,
//                             );
//                           } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                             //increment restDay counter
//                             highIntensityRestDay.set(DAY.Saturday, highIntensityRestDay.get(DAY.Saturday) + 1);
//                             restDayCounter = 1;
//                           }
//                         }
//                       }
//                     } else if (backTrack === 3) {
//                       const highIntensityWorkoutTypeOne = ifClauses[0];
//                       const highIntensityWorkoutTypeTwo = ifClauses[1];
//                       const highIntensityWorkoutTypeThree = ifClauses[2];

//                       const wednesdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Wednesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const wednesdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Wednesday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const thursdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Thursday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const thursdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Thursday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const fridayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Friday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const fridayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Friday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const wednesdayWorkoutTypes: string[] = [];
//                       const thursdayWorkoutTypes: string[] = [];
//                       const fridayWorkoutTypes: string[] = [];

//                       if (wednesdayEvening) {
//                         for (const scheduleWorkout of wednesdayEvening.scheduleWorkouts) {
//                           wednesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (wednesdayMorning) {
//                         for (const scheduleWorkout of wednesdayMorning.scheduleWorkouts) {
//                           wednesdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (thursdayEvening) {
//                         for (const scheduleWorkout of thursdayEvening.scheduleWorkouts) {
//                           thursdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (thursdayMorning) {
//                         for (const scheduleWorkout of thursdayMorning.scheduleWorkouts) {
//                           thursdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (fridayEvening) {
//                         for (const scheduleWorkout of fridayEvening.scheduleWorkouts) {
//                           fridayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (fridayMorning) {
//                         for (const scheduleWorkout of fridayMorning.scheduleWorkouts) {
//                           fridayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       const allWorkoutTypes = [
//                         ...wednesdayWorkoutTypes,
//                         ...thursdayWorkoutTypes,
//                         ...fridayWorkoutTypes,
//                       ];

//                       // Check if all high-intensity workout types are present across Friday, Saturday, and Sunday
//                       const hasHighIntensityWorkouts =
//                         allWorkoutTypes.includes(highIntensityWorkoutTypeOne) &&
//                         allWorkoutTypes.includes(highIntensityWorkoutTypeTwo) &&
//                         allWorkoutTypes.includes(highIntensityWorkoutTypeThree);

//                       if (hasHighIntensityWorkouts) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           counter = counter + 1;
//                           lowIntensityCounter = 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           let lowIntensityWorkoutCount = 0;
//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];
//                           //check combination rules as well to see if anything comes before or after
//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Saturday,
//                             GYM_SESSION.Evening,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Saturday, highIntensityRestDay.get(DAY.Saturday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   }
//                 }
//                 if (lowIntensityCounter === 0 && restDayCounter === 0) {
//                   workoutOccurrence = workoutOccurrence + 1;
//                   counter = counter + 1;

//                   //check combination rules as well to see if anything comes before or after

//                   await this.handleCombinations(
//                     originalPlan,
//                     workoutType,
//                     userPlan,
//                     DAY.Saturday,
//                     GYM_SESSION.Evening,
//                     daysOfWeek,
//                   );
//                 }
//               } else {
//                 workoutOccurrence = workoutOccurrence + 1;
//                 counter = counter + 1;

//                 //check combination rules as well to see if anything comes before or after

//                 await this.handleCombinations(
//                   originalPlan,
//                   workoutType,
//                   userPlan,
//                   DAY.Saturday,
//                   GYM_SESSION.Evening,
//                   daysOfWeek,
//                 );
//               }
//             }
//           }
//         }
//       }
//     }
//   } else if (weekDaySetting.day === DAY.Sunday) {
//     if (this.countConsecutiveNonZeroDays(daysOfWeek, DAY.Sunday) !== restDays) {
//       if (weekDaySetting.session === GYM_SESSION.Morning) {
//         const exist = await this.prisma.planSchedule.findUnique({
//           where: {
//             week_day_gymSession_planId: {
//               week: 1,
//               planId: userPlan.planId,
//               gymSession: GYM_SESSION.Morning,
//               day: DAY.Sunday,
//             },
//           },
//           include: {
//             scheduleWorkouts: {
//               include: {
//                 workout: true,
//               },
//             },
//           },
//         });

//         if (!exist) {
//           //check break rules
//           const breakRules = await this.prisma.breakRules.findMany({
//             where: {
//               planId: originalPlan.id,
//               workoutType,
//             },
//           });

//           let twoDayBefore = true;
//           let oneHalfDayBefore = true;
//           let oneDayBefore = true;
//           let oneDayAfter = true;
//           let oneHalfDayAfter = true;
//           let twoDayAfter = true;

//           for (const breakRule of breakRules) {
//             if (breakRule.day === BREAK_RULE_DAYS.TwoDayBefore) {
//               //Monday 2 ===> Sat Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//               const satEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Saturday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const satMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Saturday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const friEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Friday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const satEveningWorkoutTypes: string[] = [];
//               const satMorningWorkoutTypes: string[] = [];
//               const friEveningWorkoutTypes: string[] = [];

//               if (satEvening) {
//                 for (const scheduleWorkout of satEvening?.scheduleWorkouts) {
//                   satEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (satMorning) {
//                 for (const scheduleWorkout of satMorning?.scheduleWorkouts) {
//                   satMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (friEvening) {
//                 for (const scheduleWorkout of friEvening?.scheduleWorkouts) {
//                   friEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) =>
//                   satEveningWorkoutTypes.includes(type) ||
//                   satMorningWorkoutTypes.includes(type) ||
//                   friEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 twoDayBefore = true;
//               } else {
//                 twoDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayBefore) {
//               //Monday 1.5 ===> Sat Evening
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const satMorning = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Morning,
//                     day: DAY.Saturday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const satEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Saturday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const satMorningWorkoutTypes: string[] = [];
//               const satEveningWorkoutTypes: string[] = [];

//               if (satMorning) {
//                 for (const scheduleWorkout of satMorning?.scheduleWorkouts) {
//                   satMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }
//               if (satEvening) {
//                 for (const scheduleWorkout of satEvening?.scheduleWorkouts) {
//                   satEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                 (type) => satMorningWorkoutTypes.includes(type) || satEveningWorkoutTypes.includes(type),
//               );

//               if (!isWorkoutTypeInSchedule) {
//                 oneHalfDayBefore = true;
//                 //means no break
//               } else {
//                 oneHalfDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneDayBefore) {
//               //Monday 1 ===> Sun Morning

//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const satEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Saturday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const satEveningWorkoutTypes: string[] = [];

//               if (satEvening) {
//                 for (const scheduleWorkout of satEvening?.scheduleWorkouts) {
//                   satEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 satEveningWorkoutTypes.includes(type),
//               );

//               if (!isWorkoutTypeInSchedule) {
//                 oneDayBefore = true;
//                 //means no break
//               } else {
//                 oneDayBefore = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.TwoDayAfter) {
//               //Monday 2 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const sunEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Sunday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const sunEveningWorkoutTypes: string[] = [];
//               if (sunEvening) {
//                 for (const scheduleWorkout of sunEvening?.scheduleWorkouts) {
//                   sunEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 sunEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 twoDayAfter = true;
//               } else {
//                 twoDayAfter = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayAfter) {
//               //Monday 1.5 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//               const sunEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Sunday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const sunEveningWorkoutTypes: string[] = [];
//               if (sunEvening) {
//                 for (const scheduleWorkout of sunEvening?.scheduleWorkouts) {
//                   sunEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 sunEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 oneHalfDayAfter = true;
//               } else {
//                 oneHalfDayAfter = false;
//               }
//             } else if (breakRule.day === BREAK_RULE_DAYS.OneDayAfter) {
//               //Monday 2 ===> Wed Morning
//               const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//               const sunEvening = await this.prisma.planSchedule.findUnique({
//                 where: {
//                   week_day_gymSession_planId: {
//                     week: 1,
//                     planId: userPlan.planId,
//                     gymSession: GYM_SESSION.Evening,
//                     day: DAY.Sunday,
//                   },
//                 },
//                 include: {
//                   scheduleWorkouts: {
//                     include: {
//                       workout: true,
//                     },
//                   },
//                 },
//               });

//               const sunEveningWorkoutTypes: string[] = [];
//               if (sunEvening) {
//                 for (const scheduleWorkout of sunEvening?.scheduleWorkouts) {
//                   sunEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                 }
//               }

//               // Check if any selected workout types are present in any of the sessions
//               const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                 sunEveningWorkoutTypes.includes(type),
//               );

//               //if not present, move ahead
//               if (!isWorkoutTypeInSchedule) {
//                 oneDayAfter = true;
//               } else {
//                 oneDayAfter = false;
//               }
//             }
//           }

//           if (
//             twoDayBefore &&
//             oneHalfDayBefore &&
//             oneDayBefore &&
//             oneDayAfter &&
//             oneDayAfter &&
//             oneHalfDayAfter &&
//             twoDayAfter
//           ) {
//             //now check low intensity rules
//             const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
//               where: {
//                 planId: originalPlan.id,
//               },
//             });

//             const lowIntensityWorkoutTypes = lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes;

//             if (lowIntensityWorkoutTypes) {
//               const lowIntensityRules = await this.prisma.lowIntensityRules.findMany({
//                 where: {
//                   planId: originalPlan.id,
//                 },
//               });

//               let lowIntensityCounter = 0;
//               let restDayCounter = 0;
//               for (const lowIntensityRule of lowIntensityRules) {
//                 const { ifClauses, thenClause } = lowIntensityRule;

//                 const backTrack = ifClauses.length;

//                 if (lowIntensityCounter !== 1 || restDayCounter !== 1) {
//                   if (backTrack === 1) {
//                     //Monday Mor ===> Sunday Even
//                     if (
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                     ) {
//                       const highIntensityWorkoutType = ifClauses[0];
//                       const saturdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Saturday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const saturdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Saturday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const saturdayEveningWorkoutTypes: string[] = [];
//                       const saturdayMorningWorkoutTypes: string[] = [];

//                       if (saturdayEvening) {
//                         for (const scheduleWorkout of saturdayEvening.scheduleWorkouts) {
//                           saturdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (saturdayMorning) {
//                         for (const scheduleWorkout of saturdayMorning.scheduleWorkouts) {
//                           saturdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       // Check if highIntensityWorkoutType is in sundayEveningWorkoutTypes or sundayMorningWorkoutTypes
//                       const isHighWorkoutTypeInEvening =
//                         saturdayEveningWorkoutTypes.includes(highIntensityWorkoutType);
//                       const isHighWorkoutTypeInMorning =
//                         saturdayMorningWorkoutTypes.includes(highIntensityWorkoutType);

//                       if (isHighWorkoutTypeInEvening || isHighWorkoutTypeInMorning) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           lowIntensityCounter = 1;
//                           counter = counter + 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];

//                           //check combination rules as well to see if anything comes before or after
//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Sunday,
//                             GYM_SESSION.Morning,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Sunday, highIntensityRestDay.get(DAY.Sunday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   } else if (backTrack === 2) {
//                     //Monday Mor ===> Sat Mor, Sat Even, Sun Mor, Sun Even
//                     if (
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay &&
//                       ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                       ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                     ) {
//                       const highIntensityWorkoutTypeOne = ifClauses[0];
//                       const highIntensityWorkoutTypeTwo = ifClauses[1];

//                       const saturdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Saturday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const saturdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Saturday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const fridayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Friday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const fridayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Friday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const saturdayEveningWorkoutTypes: string[] = [];
//                       const saturdayMorningWorkoutTypes: string[] = [];
//                       const fridayEveningWorkoutTypes: string[] = [];
//                       const fridayMorningWorkoutTypes: string[] = [];

//                       if (saturdayEvening) {
//                         for (const scheduleWorkout of saturdayEvening.scheduleWorkouts) {
//                           saturdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (saturdayMorning) {
//                         for (const scheduleWorkout of saturdayMorning.scheduleWorkouts) {
//                           saturdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (fridayEvening) {
//                         for (const scheduleWorkout of fridayEvening.scheduleWorkouts) {
//                           fridayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (fridayMorning) {
//                         for (const scheduleWorkout of fridayMorning.scheduleWorkouts) {
//                           fridayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       // Check if highIntensityWorkoutTypeOne is in both Saturday and Sunday
//                       const isHighWorkoutTypeOneInFriday =
//                         fridayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                         fridayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                       const isHighWorkoutTypeOneInSaturday =
//                         saturdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                         saturdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                       // Check if highIntensityWorkoutTypeTwo is in both Saturday and Sunday
//                       const isHighWorkoutTypeTwoInFriday =
//                         fridayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                         fridayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                       const isHighWorkoutTypeTwoInSaturday =
//                         saturdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                         saturdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                       // Trigger logic if both high-intensity workouts are scheduled on consecutive days
//                       if (
//                         (isHighWorkoutTypeOneInFriday || isHighWorkoutTypeOneInSaturday) &&
//                         (isHighWorkoutTypeTwoInFriday || isHighWorkoutTypeTwoInSaturday)
//                       ) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           counter = counter + 1;
//                           lowIntensityCounter = 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];

//                           //check combination rules as well to see if anything comes before or after

//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Sunday,
//                             GYM_SESSION.Morning,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Sunday, highIntensityRestDay.get(DAY.Sunday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   } else if (backTrack === 3) {
//                     const highIntensityWorkoutTypeOne = ifClauses[0];
//                     const highIntensityWorkoutTypeTwo = ifClauses[1];
//                     const highIntensityWorkoutTypeThree = ifClauses[2];

//                     const thursdayEvening = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Evening,
//                           day: DAY.Thursday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const thursdayMorning = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Morning,
//                           day: DAY.Thursday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const fridayEvening = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Evening,
//                           day: DAY.Friday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const fridayMorning = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Morning,
//                           day: DAY.Friday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const saturdayEvening = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Evening,
//                           day: DAY.Saturday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const saturdayMorning = await this.prisma.planSchedule.findUnique({
//                       where: {
//                         week_day_gymSession_planId: {
//                           week: 1,
//                           planId: userPlan.planId,
//                           gymSession: GYM_SESSION.Morning,
//                           day: DAY.Saturday,
//                         },
//                       },
//                       include: {
//                         scheduleWorkouts: {
//                           include: {
//                             workout: true,
//                           },
//                         },
//                       },
//                     });

//                     const thursdayWorkoutTypes: string[] = [];
//                     const fridayWorkoutTypes: string[] = [];
//                     const saturdayWorkoutTypes: string[] = [];

//                     if (thursdayEvening) {
//                       for (const scheduleWorkout of thursdayEvening.scheduleWorkouts) {
//                         thursdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (thursdayMorning) {
//                       for (const scheduleWorkout of thursdayMorning.scheduleWorkouts) {
//                         thursdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (fridayEvening) {
//                       for (const scheduleWorkout of fridayEvening.scheduleWorkouts) {
//                         fridayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (fridayMorning) {
//                       for (const scheduleWorkout of fridayMorning.scheduleWorkouts) {
//                         fridayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (saturdayEvening) {
//                       for (const scheduleWorkout of saturdayEvening.scheduleWorkouts) {
//                         saturdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     if (saturdayMorning) {
//                       for (const scheduleWorkout of saturdayMorning.scheduleWorkouts) {
//                         saturdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                       }
//                     }

//                     const allWorkoutTypes = [
//                       ...thursdayWorkoutTypes,
//                       ...fridayWorkoutTypes,
//                       ...saturdayWorkoutTypes,
//                     ];

//                     // Check if all high-intensity workout types are present across Friday, Saturday, and Sunday
//                     const hasHighIntensityWorkouts =
//                       allWorkoutTypes.includes(highIntensityWorkoutTypeOne) &&
//                       allWorkoutTypes.includes(highIntensityWorkoutTypeTwo) &&
//                       allWorkoutTypes.includes(highIntensityWorkoutTypeThree);

//                     if (hasHighIntensityWorkouts) {
//                       if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                         counter = counter + 1;
//                         lowIntensityCounter = 1;

//                         const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                         // Select one workout type randomly
//                         const randomLowIntensityWorkoutType =
//                           shuffledLowIntensityWorkoutTypes[
//                             Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                           ];
//                         //check combination rules as well to see if anything comes before or after

//                         await this.handleCombinations(
//                           originalPlan,
//                           randomLowIntensityWorkoutType,
//                           userPlan,
//                           DAY.Sunday,
//                           GYM_SESSION.Morning,
//                           daysOfWeek,
//                         );
//                       } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                         //increment restDay counter
//                         highIntensityRestDay.set(DAY.Sunday, highIntensityRestDay.get(DAY.Sunday) + 1);
//                         restDayCounter = 1;
//                       }
//                     }
//                   }
//                 }
//               }
//               if (lowIntensityCounter === 0 && restDayCounter === 0) {
//                 workoutOccurrence = workoutOccurrence + 1;
//                 counter = counter + 1;

//                 //check combination rules as well to see if anything comes before or after

//                 await this.handleCombinations(
//                   originalPlan,
//                   workoutType,
//                   userPlan,
//                   DAY.Sunday,
//                   GYM_SESSION.Morning,
//                   daysOfWeek,
//                 );
//               }
//             } else {
//               workoutOccurrence = workoutOccurrence + 1;
//               counter = counter + 1;

//               //check combination rules as well to see if anything comes before or after

//               await this.handleCombinations(
//                 originalPlan,
//                 workoutType,
//                 userPlan,
//                 DAY.Sunday,
//                 GYM_SESSION.Morning,
//                 daysOfWeek,
//               );
//             }
//           }
//         }
//       } else if (weekDaySetting.session === GYM_SESSION.Evening) {
//         const exist = await this.prisma.planSchedule.findUnique({
//           where: {
//             week_day_gymSession_planId: {
//               week: 1,
//               planId: userPlan.planId,
//               gymSession: GYM_SESSION.Evening,
//               day: DAY.Sunday,
//             },
//           },
//           include: {
//             scheduleWorkouts: {
//               include: {
//                 workout: true,
//               },
//             },
//           },
//         });

//         if (highIntensityRestDay.get(DAY.Sunday) === 0) {
//           if (!exist) {
//             //check break rules
//             const breakRules = await this.prisma.breakRules.findMany({
//               where: {
//                 planId: originalPlan.id,
//                 workoutType,
//               },
//             });

//             let twoDayBefore = true;
//             let oneHalfDayBefore = true;
//             let oneDayBefore = true;
//             let oneDayAfter = true;
//             let oneHalfDayAfter = true;
//             let twoDayAfter = true;

//             for (const breakRule of breakRules) {
//               if (breakRule.day === BREAK_RULE_DAYS.TwoDayBefore) {
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;
//                 const sunMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Sunday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const satMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Saturday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const satEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Saturday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const sunMorningWorkoutTypes: string[] = [];
//                 const satMorningWorkoutTypes: string[] = [];
//                 const satEveningWorkoutTypes: string[] = [];
//                 if (sunMorning) {
//                   for (const scheduleWorkout of sunMorning?.scheduleWorkouts) {
//                     sunMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (satMorning) {
//                   for (const scheduleWorkout of satMorning?.scheduleWorkouts) {
//                     satMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (satEvening) {
//                   for (const scheduleWorkout of satEvening?.scheduleWorkouts) {
//                     satEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) =>
//                     sunMorningWorkoutTypes.includes(type) ||
//                     satMorningWorkoutTypes.includes(type) ||
//                     satEveningWorkoutTypes.includes(type),
//                 );

//                 //if not present, move ahead
//                 if (!isWorkoutTypeInSchedule) {
//                   twoDayBefore = true;
//                 } else {
//                   twoDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneHalfDayBefore) {
//                 //Monday 1.5 ===> Sat Evening
//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const sunMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Sunday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const satEvening = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Evening,
//                       day: DAY.Saturday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const sunMorningWorkoutTypes: string[] = [];
//                 const satEveningWorkoutTypes: string[] = [];

//                 if (sunMorning) {
//                   for (const scheduleWorkout of sunMorning?.scheduleWorkouts) {
//                     sunMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }
//                 if (satEvening) {
//                   for (const scheduleWorkout of satEvening?.scheduleWorkouts) {
//                     satEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some(
//                   (type) => sunMorningWorkoutTypes.includes(type) || satEveningWorkoutTypes.includes(type),
//                 );

//                 if (!isWorkoutTypeInSchedule) {
//                   oneHalfDayBefore = true;
//                   //means no break
//                 } else {
//                   oneHalfDayBefore = false;
//                 }
//               } else if (breakRule.day === BREAK_RULE_DAYS.OneDayBefore) {
//                 //Monday 1 ===> Sun Morning

//                 const selectedWorkoutTypes = breakRule.selectedWorkoutTypes;

//                 const sunMorning = await this.prisma.planSchedule.findUnique({
//                   where: {
//                     week_day_gymSession_planId: {
//                       week: 1,
//                       planId: userPlan.planId,
//                       gymSession: GYM_SESSION.Morning,
//                       day: DAY.Sunday,
//                     },
//                   },
//                   include: {
//                     scheduleWorkouts: {
//                       include: {
//                         workout: true,
//                       },
//                     },
//                   },
//                 });

//                 const sunMorningWorkoutTypes: string[] = [];

//                 if (sunMorning) {
//                   for (const scheduleWorkout of sunMorning?.scheduleWorkouts) {
//                     sunMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                   }
//                 }

//                 // Check if any selected workout types are present in any of the sessions
//                 const isWorkoutTypeInSchedule = selectedWorkoutTypes.some((type) =>
//                   sunMorningWorkoutTypes.includes(type),
//                 );

//                 if (!isWorkoutTypeInSchedule) {
//                   oneDayBefore = true;
//                   //means no break
//                 } else {
//                   oneDayBefore = false;
//                 }
//               }
//             }

//             if (
//               twoDayBefore &&
//               oneHalfDayBefore &&
//               oneDayBefore &&
//               oneDayAfter &&
//               oneDayAfter &&
//               oneHalfDayAfter &&
//               twoDayAfter
//             ) {
//               const lowIntensityWorkoutTypesData = await this.prisma.lowIntensityWorkoutTypes.findUnique({
//                 where: {
//                   planId: originalPlan.id,
//                 },
//               });

//               const lowIntensityWorkoutTypes = lowIntensityWorkoutTypesData.lowIntensityWorkoutTypes;

//               if (lowIntensityWorkoutTypes) {
//                 const lowIntensityRules = await this.prisma.lowIntensityRules.findMany({
//                   where: {
//                     planId: originalPlan.id,
//                   },
//                 });

//                 let lowIntensityCounter = 0;
//                 let restDayCounter = 0;
//                 for (const lowIntensityRule of lowIntensityRules) {
//                   const { ifClauses, thenClause } = lowIntensityRule;

//                   const backTrack = ifClauses.length;

//                   if (lowIntensityCounter !== 1 || restDayCounter !== 1) {
//                     if (backTrack === 1) {
//                       //Monday Mor ===> Sunday Even
//                       if (
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                       ) {
//                         const highIntensityWorkoutType = ifClauses[0];
//                         const saturdayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Saturday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const saturdayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Saturday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const saturdayEveningWorkoutTypes: string[] = [];
//                         const saturdayMorningWorkoutTypes: string[] = [];

//                         if (saturdayEvening) {
//                           for (const scheduleWorkout of saturdayEvening.scheduleWorkouts) {
//                             saturdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (saturdayMorning) {
//                           for (const scheduleWorkout of saturdayMorning.scheduleWorkouts) {
//                             saturdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         // Check if highIntensityWorkoutType is in sundayEveningWorkoutTypes or sundayMorningWorkoutTypes
//                         const isHighWorkoutTypeInEvening =
//                           saturdayEveningWorkoutTypes.includes(highIntensityWorkoutType);
//                         const isHighWorkoutTypeInMorning =
//                           saturdayMorningWorkoutTypes.includes(highIntensityWorkoutType);

//                         if (isHighWorkoutTypeInEvening || isHighWorkoutTypeInMorning) {
//                           if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                             lowIntensityCounter = 1;
//                             counter = counter + 1;

//                             const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                             // Select one workout type randomly
//                             const randomLowIntensityWorkoutType =
//                               shuffledLowIntensityWorkoutTypes[
//                                 Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                               ];

//                             //check combination rules as well to see if anything comes before or after
//                             await this.handleCombinations(
//                               originalPlan,
//                               randomLowIntensityWorkoutType,
//                               userPlan,
//                               DAY.Sunday,
//                               GYM_SESSION.Evening,
//                               daysOfWeek,
//                             );
//                           } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                             //increment restDay counter
//                             highIntensityRestDay.set(DAY.Sunday, highIntensityRestDay.get(DAY.Sunday) + 1);
//                             restDayCounter = 1;
//                           }
//                         }
//                       }
//                     } else if (backTrack === 2) {
//                       //Monday Mor ===> Sat Mor, Sat Even, Sun Mor, Sun Even
//                       if (
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[0] !== IF_CLAUSE_LOW_INTENSITY.RestDay &&
//                         ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.LowIntensityWorkout &&
//                         ifClauses[1] !== IF_CLAUSE_LOW_INTENSITY.RestDay
//                       ) {
//                         const highIntensityWorkoutTypeOne = ifClauses[0];
//                         const highIntensityWorkoutTypeTwo = ifClauses[1];

//                         const saturdayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Saturday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const saturdayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Saturday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const fridayEvening = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Evening,
//                               day: DAY.Friday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const fridayMorning = await this.prisma.planSchedule.findUnique({
//                           where: {
//                             week_day_gymSession_planId: {
//                               week: 1,
//                               planId: userPlan.planId,
//                               gymSession: GYM_SESSION.Morning,
//                               day: DAY.Friday,
//                             },
//                           },
//                           include: {
//                             scheduleWorkouts: {
//                               include: {
//                                 workout: true,
//                               },
//                             },
//                           },
//                         });

//                         const saturdayEveningWorkoutTypes: string[] = [];
//                         const saturdayMorningWorkoutTypes: string[] = [];
//                         const fridayEveningWorkoutTypes: string[] = [];
//                         const fridayMorningWorkoutTypes: string[] = [];

//                         if (saturdayEvening) {
//                           for (const scheduleWorkout of saturdayEvening.scheduleWorkouts) {
//                             saturdayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (saturdayMorning) {
//                           for (const scheduleWorkout of saturdayMorning.scheduleWorkouts) {
//                             saturdayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (fridayEvening) {
//                           for (const scheduleWorkout of fridayEvening.scheduleWorkouts) {
//                             fridayEveningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         if (fridayMorning) {
//                           for (const scheduleWorkout of fridayMorning.scheduleWorkouts) {
//                             fridayMorningWorkoutTypes.push(scheduleWorkout.workout.type);
//                           }
//                         }

//                         // Check if highIntensityWorkoutTypeOne is in both Saturday and Sunday
//                         const isHighWorkoutTypeOneInFriday =
//                           fridayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                           fridayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                         const isHighWorkoutTypeOneInSaturday =
//                           saturdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeOne) ||
//                           saturdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeOne);

//                         // Check if highIntensityWorkoutTypeTwo is in both Saturday and Sunday
//                         const isHighWorkoutTypeTwoInFriday =
//                           fridayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                           fridayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                         const isHighWorkoutTypeTwoInSaturday =
//                           saturdayEveningWorkoutTypes.includes(highIntensityWorkoutTypeTwo) ||
//                           saturdayMorningWorkoutTypes.includes(highIntensityWorkoutTypeTwo);

//                         // Trigger logic if both high-intensity workouts are scheduled on consecutive days
//                         if (
//                           (isHighWorkoutTypeOneInFriday || isHighWorkoutTypeOneInSaturday) &&
//                           (isHighWorkoutTypeTwoInFriday || isHighWorkoutTypeTwoInSaturday)
//                         ) {
//                           if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                             counter = counter + 1;
//                             lowIntensityCounter = 1;

//                             const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                             // Select one workout type randomly
//                             const randomLowIntensityWorkoutType =
//                               shuffledLowIntensityWorkoutTypes[
//                                 Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                               ];

//                             //check combination rules as well to see if anything comes before or after

//                             await this.handleCombinations(
//                               originalPlan,
//                               randomLowIntensityWorkoutType,
//                               userPlan,
//                               DAY.Sunday,
//                               GYM_SESSION.Evening,
//                               daysOfWeek,
//                             );
//                           } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                             //increment restDay counter
//                             highIntensityRestDay.set(DAY.Sunday, highIntensityRestDay.get(DAY.Sunday) + 1);
//                             restDayCounter = 1;
//                           }
//                         }
//                       }
//                     } else if (backTrack === 3) {
//                       const highIntensityWorkoutTypeOne = ifClauses[0];
//                       const highIntensityWorkoutTypeTwo = ifClauses[1];
//                       const highIntensityWorkoutTypeThree = ifClauses[2];

//                       const thursdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Thursday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const thursdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Thursday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const fridayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Friday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const fridayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Friday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const saturdayEvening = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Evening,
//                             day: DAY.Saturday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const saturdayMorning = await this.prisma.planSchedule.findUnique({
//                         where: {
//                           week_day_gymSession_planId: {
//                             week: 1,
//                             planId: userPlan.planId,
//                             gymSession: GYM_SESSION.Morning,
//                             day: DAY.Saturday,
//                           },
//                         },
//                         include: {
//                           scheduleWorkouts: {
//                             include: {
//                               workout: true,
//                             },
//                           },
//                         },
//                       });

//                       const thursdayWorkoutTypes: string[] = [];
//                       const fridayWorkoutTypes: string[] = [];
//                       const saturdayWorkoutTypes: string[] = [];

//                       if (thursdayEvening) {
//                         for (const scheduleWorkout of thursdayEvening.scheduleWorkouts) {
//                           thursdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (thursdayMorning) {
//                         for (const scheduleWorkout of thursdayMorning.scheduleWorkouts) {
//                           thursdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (fridayEvening) {
//                         for (const scheduleWorkout of fridayEvening.scheduleWorkouts) {
//                           fridayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (fridayMorning) {
//                         for (const scheduleWorkout of fridayMorning.scheduleWorkouts) {
//                           fridayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (saturdayEvening) {
//                         for (const scheduleWorkout of saturdayEvening.scheduleWorkouts) {
//                           saturdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       if (saturdayMorning) {
//                         for (const scheduleWorkout of saturdayMorning.scheduleWorkouts) {
//                           saturdayWorkoutTypes.push(scheduleWorkout.workout.type);
//                         }
//                       }

//                       const allWorkoutTypes = [
//                         ...thursdayWorkoutTypes,
//                         ...fridayWorkoutTypes,
//                         ...saturdayWorkoutTypes,
//                       ];

//                       // Check if all high-intensity workout types are present across Friday, Saturday, and Sunday
//                       const hasHighIntensityWorkouts =
//                         allWorkoutTypes.includes(highIntensityWorkoutTypeOne) &&
//                         allWorkoutTypes.includes(highIntensityWorkoutTypeTwo) &&
//                         allWorkoutTypes.includes(highIntensityWorkoutTypeThree);

//                       if (hasHighIntensityWorkouts) {
//                         if (thenClause === THEN_CLAUSE_LOW_INTENSITY.LowIntensityWorkout) {
//                           counter = counter + 1;
//                           lowIntensityCounter = 1;

//                           const shuffledLowIntensityWorkoutTypes = this.shuffleArray(lowIntensityWorkoutTypes);

//                           // Select one workout type randomly
//                           const randomLowIntensityWorkoutType =
//                             shuffledLowIntensityWorkoutTypes[
//                               Math.floor(Math.random() * shuffledLowIntensityWorkoutTypes.length)
//                             ];
//                           //check combination rules as well to see if anything comes before or after

//                           await this.handleCombinations(
//                             originalPlan,
//                             randomLowIntensityWorkoutType,
//                             userPlan,
//                             DAY.Sunday,
//                             GYM_SESSION.Evening,
//                             daysOfWeek,
//                           );
//                         } else if (thenClause === THEN_CLAUSE_LOW_INTENSITY.RestDay) {
//                           //increment restDay counter
//                           highIntensityRestDay.set(DAY.Sunday, highIntensityRestDay.get(DAY.Sunday) + 1);
//                           restDayCounter = 1;
//                         }
//                       }
//                     }
//                   }
//                 }
//                 if (lowIntensityCounter === 0 && restDayCounter === 0) {
//                   workoutOccurrence = workoutOccurrence + 1;
//                   counter = counter + 1;

//                   //check combination rules as well to see if anything comes before or after

//                   await this.handleCombinations(
//                     originalPlan,
//                     workoutType,
//                     userPlan,
//                     DAY.Sunday,
//                     GYM_SESSION.Evening,
//                     daysOfWeek,
//                   );
//                 }
//               } else {
//                 workoutOccurrence = workoutOccurrence + 1;
//                 counter = counter + 1;

//                 //check combination rules as well to see if anything comes before or after

//                 await this.handleCombinations(
//                   originalPlan,
//                   workoutType,
//                   userPlan,
//                   DAY.Sunday,
//                   GYM_SESSION.Evening,
//                   daysOfWeek,
//                 );
//               }
//             }
//           }
//         }
//       }
//     }
//   }