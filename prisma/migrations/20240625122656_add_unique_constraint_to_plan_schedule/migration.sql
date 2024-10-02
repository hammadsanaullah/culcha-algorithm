/*
  Warnings:

  - A unique constraint covering the columns `[year,month,week,day]` on the table `PlanSchedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlanSchedule_year_month_week_day_key" ON "PlanSchedule"("year", "month", "week", "day");
