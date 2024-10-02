/*
  Warnings:

  - You are about to drop the column `highIntenstiyWorkoutTypes` on the `LowIntensityWorkoutTypes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LowIntensityWorkoutTypes" DROP COLUMN "highIntenstiyWorkoutTypes",
ADD COLUMN     "highIntensityWorkoutTypes" "WORKOUT_TYPE"[];
