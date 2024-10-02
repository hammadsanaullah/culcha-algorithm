/*
  Warnings:

  - A unique constraint covering the columns `[year,month,week,day,gymSession,planId]` on the table `PlanSchedule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PlanSchedule_year_month_week_day_gymSession_key";

-- CreateIndex
CREATE UNIQUE INDEX "PlanSchedule_year_month_week_day_gymSession_planId_key" ON "PlanSchedule"("year", "month", "week", "day", "gymSession", "planId");
