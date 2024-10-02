// import {
//   BENCHMARKS,
//   EXERCISE_TYPE,
//   MUSCLE_GROUP,
//   POST_CATEGORY,
//   PrismaClient,
//   ROLE_TITLE,
//   WORKOUT_CATEGORY,
//   WORKOUT_TYPE,
// } from '@prisma/client';
// const prisma = new PrismaClient();
// import { faker } from '@faker-js/faker';

// async function main() {
//   console.log('Seeding roles...');

//   function getRandomPostCategory() {
//     const categories = Object.values(POST_CATEGORY);
//     const randomIndex = Math.floor(Math.random() * categories.length);
//     return categories[randomIndex];
//   }

//   // Create roles if they don't exist
//   const userRole = await prisma.role.upsert({
//     where: { title: ROLE_TITLE.ATHLETE },
//     create: { title: ROLE_TITLE.ATHLETE },
//     update: { title: ROLE_TITLE.ATHLETE },
//   });

//   const adminRole = await prisma.role.upsert({
//     where: { title: ROLE_TITLE.ADMIN },
//     create: { title: ROLE_TITLE.ADMIN },
//     update: { title: ROLE_TITLE.ADMIN },
//   });

//   console.log('Creating admins...');
//   const adminEmails = [
//     'culcha@outlook.com',
//     'tim.wenisch@web.de',
//     'contact-us@pakgeeks.de',
//   ];

//   const adminData = [
//     {
//       firstName: 'Culcha',
//       lastName: 'Admin',
//       fullName: 'Culcha Admin',
//       email: 'culcha@outlook.com',
//     },
//     {
//       firstName: 'Tim',
//       lastName: 'Wenisch',
//       fullName: 'Tim Wenisch',
//       email: 'tim.wenisch@web.de',
//     },
//     {
//       firstName: 'Pak',
//       lastName: 'Geeks',
//       fullName: 'Pak Geeks',
//       email: 'contact-us@pakgeeks.de',
//     },
//   ];

//   for (let i = 0; i < adminData.length; i++) {
//     await prisma.user.upsert({
//       where: { email: adminEmails[i] },
//       create: {
//         ...adminData[i],
//         isVerified: true,
//         password: {
//           create: {
//             password:
//               '$2b$10$VwZIxxc8aA4dEa3KMuTINOD6qgfAaxxk6hKjPNDjalCcuKrpkXfjK',
//           },
//         },
//         roleId: adminRole.id,
//       },
//       update: {},
//     });
//   }

//   console.log('Creating athletes...');
//   // Create 10 athletes
//   for (let i = 0; i < 10; i++) {
//     const firstName = faker.person.firstName();
//     const lastName = faker.person.lastName();
//     const email = faker.internet.email().toLowerCase();

//     await prisma.user.upsert({
//       where: { email: email },
//       create: {
//         firstName: firstName,
//         lastName: lastName,
//         fullName: `${firstName} ${lastName}`,
//         email: email,
//         profilePicture: faker.image.avatar(),
//         isVerified: true,
//         plan: Math.random() < 0.5 ? 'Hybrid' : 'Running',
//         status: Math.random() < 0.5 ? 'Active' : 'Inactive',
//         paymentStatus: Math.random() < 0.5 ? 'Paid in Time' : "Didn't Pay",
//         password: {
//           create: {
//             password:
//               '$2b$10$U2.bAhibsIfKO8A8RDqfi.Lmo5Zl7H9hhJ7QlRLQNMhbJzXtnHpt2',
//           },
//         },
//         roleId: userRole.id,
//       },
//       update: {},
//     });

//     await prisma.post.create({
//       data: {
//         title: faker.company.name(),
//         category: getRandomPostCategory(),
//         description: faker.lorem.paragraphs(),
//         imageUrl: faker.image.url({ width: 640, height: 768 }),
//         externalLink: faker.image.url(),
//       },
//     });
//   }

//   //Workout 1
//   let workoutSuperSet = await prisma.workoutSuperSet.create({
//     data: {},
//   });

//   let workout = await prisma.workout.create({
//     data: {
//       name: 'Cool Down W2D2',
//       duration: '0h 15m',
//       durationSeconds: 900,
//       type: WORKOUT_TYPE.CoolDownRunning,
//       frequency: 1,
//       injuries: [],
//       relatedInjuries: [],
//       generated: true,
//       userClone: false,
//       holidayMode: false,
//       workoutSuperSetId: workoutSuperSet.id,
//     },
//   });

//   let workoutPart1 = await prisma.workoutParts.create({
//     data: {
//       name: 'Cool Down',
//       position: 1,
//       userClone: false,
//       workoutId: workout.id,
//     },
//   });

//   const stretchingExercise = await prisma.exercise.create({
//     data: {
//       name: 'Stretching',
//       category: WORKOUT_CATEGORY.Gym,
//       description: 'Sample Exercise',
//       exerciseType: EXERCISE_TYPE.Simple,
//       relatedInjuries: [],
//       benchmarks: [BENCHMARKS.NoBenchmark],
//     },
//   });

//   await prisma.partExercises.create({
//     data: {
//       benchmark: BENCHMARKS.NoBenchmark,
//       intensity: '100%',
//       position: 2,
//       partId: workoutPart1.id,
//       userClone: false,
//       exerciseId: stretchingExercise.id,
//     },
//   });

//   const runningEasyExercise = await prisma.exercise.create({
//     data: {
//       name: 'Running Easy',
//       category: WORKOUT_CATEGORY.Cardio,
//       description: '-',
//       exerciseType: EXERCISE_TYPE.Simple,
//       relatedInjuries: [],
//       benchmarks: [BENCHMARKS.HRR, BENCHMARKS.NoseBreathing, BENCHMARKS.SPM],
//     },
//   });

//   await prisma.partExercises.create({
//     data: {
//       benchmark: BENCHMARKS.NoBenchmark,
//       intensity: '100%',
//       position: 1,
//       fieldOne: '15',
//       fieldTwo: 'min',
//       partId: workoutPart1.id,
//       userClone: false,
//       exerciseId: runningEasyExercise.id,
//     },
//   });

//   //Workout 2
//   workoutSuperSet = await prisma.workoutSuperSet.create({
//     data: {},
//   });

//   workout = await prisma.workout.create({
//     data: {
//       name: 'Intervals W2D2',
//       duration: '0h 15m',
//       durationSeconds: 900,
//       type: WORKOUT_TYPE.CardioIntervalRun,
//       frequency: 1,
//       injuries: [],
//       relatedInjuries: [],
//       generated: true,
//       userClone: false,
//       holidayMode: false,
//       workoutSuperSetId: workoutSuperSet.id,
//     },
//   });

//   const workoutPartA = await prisma.workoutParts.create({
//     data: {
//       name: 'A',
//       position: 1,
//       userClone: false,
//       workoutId: workout.id,
//     },
//   });

//   const workoutPartB = await prisma.workoutParts.create({
//     data: {
//       name: 'B',
//       position: 2,
//       userClone: false,
//       workoutId: workout.id,
//     },
//   });

//   await prisma.comment.create({
//     data: {
//       comment: 'with',
//       position: 2,
//       userClone: false,
//       workoutPartsId: workoutPartA.id,
//     },
//   });

//   await prisma.comment.create({
//     data: {
//       comment: 'with',
//       position: 2,
//       userClone: false,
//       workoutPartsId: workoutPartB.id,
//     },
//   });

//   await prisma.partExercises.createMany({
//     data: [
//       {
//         benchmark: BENCHMARKS.HRR,
//         intensity: '60%',
//         position: 3,
//         fieldOne: '200',
//         fieldTwo: 'meters',
//         partId: workoutPartA.id,
//         userClone: false,
//         exerciseId: runningEasyExercise.id,
//       },
//       {
//         benchmark: BENCHMARKS.HRR,
//         intensity: '85%',
//         position: 1,
//         fieldOne: '4x4',
//         fieldTwo: 'min',
//         partId: workoutPartA.id,
//         userClone: false,
//         exerciseId: runningEasyExercise.id,
//       },
//     ],
//   });

//   // Associate exercises with workout part B
//   await prisma.partExercises.createMany({
//     data: [
//       {
//         benchmark: BENCHMARKS.NoBenchmark,
//         intensity: '100%',
//         position: 3,
//         fieldOne: '90',
//         partId: workoutPartB.id,
//         userClone: false,
//         exerciseId: runningEasyExercise.id,
//       },
//       {
//         benchmark: BENCHMARKS.NoBenchmark,
//         intensity: null,
//         position: 1,
//         fieldOne: '4x2',
//         fieldTwo: 'min',
//         partId: workoutPartB.id,
//         userClone: false,
//         exerciseId: runningEasyExercise.id,
//       },
//     ],
//   });

//   //Workout 3
//   workoutSuperSet = await prisma.workoutSuperSet.create({
//     data: {},
//   });

//   workout = await prisma.workout.create({
//     data: {
//       name: 'Warm up Intervals W2D2',
//       duration: '0h 15m',
//       durationSeconds: 900,
//       type: WORKOUT_TYPE.WarmUpIntervals,
//       frequency: 1,
//       injuries: [],
//       relatedInjuries: [],
//       generated: true,
//       userClone: false,
//       holidayMode: false,
//       workoutSuperSetId: workoutSuperSet.id,
//     },
//   });

//   let workoutPart = await prisma.workoutParts.create({
//     data: {
//       name: 'Warm up',
//       position: 1,
//       userClone: false,
//       workoutId: workout.id,
//     },
//   });

//   const stridesWithEasyRunExercise = await prisma.exercise.create({
//     data: {
//       name: 'Strides with easy run back',
//       category: WORKOUT_CATEGORY.Cardio,
//       description: 'Sample Exercise',
//       exerciseType: EXERCISE_TYPE.Simple,
//       relatedInjuries: [],
//       benchmarks: [BENCHMARKS.NoBenchmark],
//     },
//   });

//   // Associate exercises with workout parts
//   await prisma.partExercises.createMany({
//     data: [
//       {
//         benchmark: 'NoBenchmark',
//         intensity: '100%',
//         position: 2,
//         fieldOne: '3x80',
//         fieldTwo: 'meters',
//         partId: workoutPart.id,
//         userClone: false,
//         exerciseId: stridesWithEasyRunExercise.id,
//       },
//       {
//         benchmark: 'NoBenchmark',
//         intensity: '100%',
//         position: 1,
//         fieldOne: '15',
//         fieldTwo: 'min',
//         partId: workoutPart.id,
//         userClone: false,
//         exerciseId: runningEasyExercise.id,
//       },
//     ],
//   });

//   //Workout 4
//   workoutSuperSet = await prisma.workoutSuperSet.create({
//     data: {},
//   });

//   workout = await prisma.workout.create({
//     data: {
//       name: 'WoD Full Body W2D1',
//       type: WORKOUT_TYPE.WoDFullBody,
//       generated: true,
//       duration: '0h 30m',
//       durationSeconds: 1800,
//       frequency: 1,
//       relatedInjuries: [],
//       injuries: [],
//       holidayMode: false,
//       userClone: false,
//       workoutSuperSetId: workoutSuperSet.id,
//     },
//   });

//   workoutPart = await prisma.workoutParts.create({
//     data: {
//       name: 'EMOM 4 Rounds',
//       position: 1,
//       workoutId: workout.id,
//       userClone: false,
//     },
//   });

//   await prisma.comment.createMany({
//     data: [
//       {
//         comment: 'alternatively',
//         position: 3,
//         userClone: false,
//         workoutPartsId: workoutPart.id,
//       },
//       {
//         comment: 'into:',
//         position: 6,
//         userClone: false,
//         workoutPartsId: workoutPart.id,
//       },
//     ],
//   });

//   const farmersCarryExercise = await prisma.exercise.create({
//     data: {
//       name: 'Famers Carry',
//       category: WORKOUT_CATEGORY.Gym,
//       description: 'Exercise',
//       exerciseType: EXERCISE_TYPE.Simple,
//       relatedInjuries: [],
//       benchmarks: [BENCHMARKS.RaceWeight],
//     },
//   });

//   const abMatSitUpsExercise = await prisma.exercise.create({
//     data: {
//       name: 'AbMat Sit-Ups',
//       category: WORKOUT_CATEGORY.Gym,
//       description: 'Sample Exercise',
//       exerciseType: EXERCISE_TYPE.Simple,
//       muscleGroup: MUSCLE_GROUP.UpperBodyCore,
//       relatedInjuries: [],
//       benchmarks: [BENCHMARKS.StandardWorkoutWeightThirteenFifteenReps],
//     },
//   });

//   const devilPressExercise = await prisma.exercise.create({
//     data: {
//       name: 'Devil Press',
//       category: WORKOUT_CATEGORY.Gym,
//       description: '-',
//       exerciseType: EXERCISE_TYPE.Simple,
//       relatedInjuries: [],
//       benchmarks: [BENCHMARKS.NoBenchmark],
//     },
//   });

//   const pushPressShoulderExercise = await prisma.exercise.create({
//     data: {
//       name: 'Push Press to the Target (only shoulder)',
//       category: WORKOUT_CATEGORY.Gym,
//       description: 'Sample Exercise',
//       exerciseType: EXERCISE_TYPE.Simple,
//       muscleGroup: MUSCLE_GROUP.UpperBodyShoulder,
//       relatedInjuries: [],
//       benchmarks: [BENCHMARKS.NoBenchmark],
//     },
//   });

//   const burpeesExercise = await prisma.exercise.create({
//     data: {
//       name: 'Burpees',
//       category: WORKOUT_CATEGORY.Gym,
//       description: '-',
//       exerciseType: EXERCISE_TYPE.Simple,
//       relatedInjuries: [],
//       benchmarks: [BENCHMARKS.NoBenchmark],
//     },
//   });

//   await prisma.partExercises.createMany({
//     data: [
//       {
//         benchmark: BENCHMARKS.RaceWeight,
//         intensity: '100%',
//         position: 7,
//         fieldOne: '200',
//         fieldTwo: 'meters',
//         userClone: false,
//         partId: workoutPart.id,
//         exerciseId: farmersCarryExercise.id,
//       },
//       {
//         benchmark: BENCHMARKS.NoBenchmark,
//         intensity: '100%',
//         position: 5,
//         fieldOne: '20',
//         userClone: false,
//         partId: workoutPart.id,
//         exerciseId: abMatSitUpsExercise.id,
//       },
//       {
//         benchmark: BENCHMARKS.NoBenchmark,
//         intensity: '100%',
//         position: 4,
//         fieldOne: '12',
//         userClone: false,
//         partId: workoutPart.id,
//         exerciseId: devilPressExercise.id,
//       },
//       {
//         benchmark: BENCHMARKS.NoBenchmark,
//         intensity: '100%',
//         position: 2,
//         fieldOne: '20',
//         userClone: false,
//         partId: workoutPart.id,
//         exerciseId: pushPressShoulderExercise.id,
//       },
//       {
//         benchmark: BENCHMARKS.NoBenchmark,
//         intensity: '100%',
//         position: 1,
//         fieldOne: '15',
//         userClone: false,
//         partId: workoutPart.id,
//         exerciseId: burpeesExercise.id,
//       },
//     ],
//   });

//   //Workout 5

//   workoutSuperSet = await prisma.workoutSuperSet.create({
//     data: {},
//   });

//   workout = await prisma.workout.create({
//     data: {
//       name: 'Finisher Shoulder W2D1',
//       type: WORKOUT_TYPE.FinisherUpper,
//       generated: true,
//       duration: '0h 30m',
//       durationSeconds: 1800,
//       frequency: 1,
//       relatedInjuries: [],
//       injuries: [],
//       holidayMode: false,
//       userClone: false,
//       workoutSuperSetId: workoutSuperSet.id,
//     },
//   });

//   workoutPart = await prisma.workoutParts.create({
//     data: {
//       name: '2 - Rounds',
//       position: 1,
//       workoutId: workout.id,
//       userClone: false,
//     },
//   });

//   await prisma.comment.createMany({
//     data: [
//       {
//         comment: 'M=20Kg, W=15Kg',
//         position: 1,
//         userClone: false,
//         workoutPartsId: workoutPart.id,
//       },
//       {
//         comment: 'Try to go unbroken - after the set - 90sec Rest',
//         position: 10,
//         userClone: false,
//         workoutPartsId: workoutPart.id,
//       },
//     ],
//   });

//   const strictPressHoldExercise = await prisma.exercise.create({
//     data: {
//       name: 'Strict Press Hold',
//       category: WORKOUT_CATEGORY.Gym,
//       description: 'Exercise',
//       exerciseType: EXERCISE_TYPE.Simple,
//       relatedInjuries: [],
//       benchmarks: [BENCHMARKS.RaceWeight],
//     },
//   });

//   const strictPressExercise = await prisma.exercise.create({
//     data: {
//       name: 'Strict Press',
//       category: WORKOUT_CATEGORY.Gym,
//       description: 'Sample Exercise',
//       exerciseType: EXERCISE_TYPE.Simple,
//       muscleGroup: MUSCLE_GROUP.UpperBodyCore,
//       relatedInjuries: [],
//       benchmarks: [BENCHMARKS.StandardWorkoutWeightThirteenFifteenReps],
//     },
//   });

//   await prisma.partExercises.createMany({
//     data: [
//       {
//         benchmark: BENCHMARKS.RaceWeight,
//         intensity: '100%',
//         position: 7,
//         fieldOne: '200',
//         fieldTwo: 'meters',
//         userClone: false,
//         partId: workoutPart.id,
//         exerciseId: farmersCarryExercise.id,
//       },
//       {
//         benchmark: BENCHMARKS.NoBenchmark,
//         intensity: '100%',
//         position: 5,
//         fieldOne: '20',
//         userClone: false,
//         partId: workoutPart.id,
//         exerciseId: abMatSitUpsExercise.id,
//       },
//       {
//         benchmark: BENCHMARKS.NoBenchmark,
//         intensity: '100%',
//         position: 4,
//         fieldOne: '12',
//         userClone: false,
//         partId: workoutPart.id,
//         exerciseId: devilPressExercise.id,
//       },
//       {
//         benchmark: BENCHMARKS.NoBenchmark,
//         intensity: '100%',
//         position: 2,
//         fieldOne: '20',
//         userClone: false,
//         partId: workoutPart.id,
//         exerciseId: pushPressShoulderExercise.id,
//       },
//       {
//         benchmark: BENCHMARKS.NoBenchmark,
//         intensity: '100%',
//         position: 1,
//         fieldOne: '15',
//         userClone: false,
//         partId: workoutPart.id,
//         exerciseId: burpeesExercise.id,
//       },
//     ],
//   });

//   console.log('Seeding completed successfully.');
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch((e) => console.error(e));
