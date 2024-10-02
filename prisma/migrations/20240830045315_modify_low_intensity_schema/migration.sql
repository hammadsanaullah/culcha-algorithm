/*
  Warnings:

  - You are about to drop the `LowIntensityRules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LowIntensityRules" DROP CONSTRAINT "LowIntensityRules_planId_fkey";

-- AlterTable
ALTER TABLE "LowIntensityWorkoutTypes" ADD COLUMN     "highIntenstiyWorkoutTypes" "WORKOUT_TYPE"[];

-- DropTable
DROP TABLE "LowIntensityRules";
