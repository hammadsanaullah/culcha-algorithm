/*
  Warnings:

  - A unique constraint covering the columns `[workoutId,userId]` on the table `ExcludedAthletesWorkout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExcludedAthletesWorkout_workoutId_userId_key" ON "ExcludedAthletesWorkout"("workoutId", "userId");
