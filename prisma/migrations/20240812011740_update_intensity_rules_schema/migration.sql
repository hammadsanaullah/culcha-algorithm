/*
  Warnings:

  - A unique constraint covering the columns `[planId]` on the table `IntensityRules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IntensityRules_planId_key" ON "IntensityRules"("planId");
