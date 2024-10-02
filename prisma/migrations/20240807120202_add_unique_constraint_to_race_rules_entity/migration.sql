/*
  Warnings:

  - A unique constraint covering the columns `[raceDay,weekDay,gymSession,type,planId]` on the table `RaceRules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RaceRules_raceDay_weekDay_gymSession_type_planId_key" ON "RaceRules"("raceDay", "weekDay", "gymSession", "type", "planId");
