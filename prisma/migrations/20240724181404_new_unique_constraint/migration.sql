/*
  Warnings:

  - A unique constraint covering the columns `[scheduleWorkoutId,exerciseId,userId,type,unit,partExerciseId]` on the table `UserBenchmarkScheduleWorkout` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserBenchmarkScheduleWorkout_scheduleWorkoutId_exerciseId_u_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserBenchmarkScheduleWorkout_scheduleWorkoutId_exerciseId_u_key" ON "UserBenchmarkScheduleWorkout"("scheduleWorkoutId", "exerciseId", "userId", "type", "unit", "partExerciseId");
