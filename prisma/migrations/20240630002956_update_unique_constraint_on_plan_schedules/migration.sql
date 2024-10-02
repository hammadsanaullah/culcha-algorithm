/*
  Warnings:

  - A unique constraint covering the columns `[week,day,gymSession,planId]` on the table `PlanSchedule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PlanSchedule_year_month_week_day_gymSession_planId_key";

-- CreateIndex
CREATE UNIQUE INDEX "PlanSchedule_week_day_gymSession_planId_key" ON "PlanSchedule"("week", "day", "gymSession", "planId");
