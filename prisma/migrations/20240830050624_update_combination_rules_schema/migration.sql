/*
  Warnings:

  - You are about to drop the column `combinationWorkoutType` on the `WorkoutTypesCombinations` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "WorkoutTypesCombinations_combinationRulesWorkoutTypesId_com_idx";

-- AlterTable
ALTER TABLE "WorkoutTypesCombinations" DROP COLUMN "combinationWorkoutType",
ADD COLUMN     "combinationWorkoutTypes" "WORKOUT_TYPE"[];

-- CreateIndex
CREATE INDEX "WorkoutTypesCombinations_combinationRulesWorkoutTypesId_idx" ON "WorkoutTypesCombinations"("combinationRulesWorkoutTypesId");
