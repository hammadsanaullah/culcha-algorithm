/*
  Warnings:

  - A unique constraint covering the columns `[planId,workoutType,day]` on the table `BreakRules` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BreakRules_workoutType_day_key";

-- CreateIndex
CREATE UNIQUE INDEX "BreakRules_planId_workoutType_day_key" ON "BreakRules"("planId", "workoutType", "day");
