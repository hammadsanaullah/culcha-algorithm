/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `WorkoutSetting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkoutSetting_userId_key" ON "WorkoutSetting"("userId");
