/*
  Warnings:

  - A unique constraint covering the columns `[exerciseId,alternativeExerciseId,planId]` on the table `AlternativeExerciseRules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AlternativeExerciseRules_exerciseId_alternativeExerciseId_p_key" ON "AlternativeExerciseRules"("exerciseId", "alternativeExerciseId", "planId");
