/*
  Warnings:

  - Added the required column `exerciseType` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscleGroup` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relatedInjuries` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "INJURY_TYPE" AS ENUM ('Back', 'Shoulder', 'Knee', 'Hip', 'Ankle', 'AchillesTendon');

-- CreateEnum
CREATE TYPE "MUSCLE_GROUP" AS ENUM ('Back', 'Shoulder', 'Bicep', 'Tricep', 'Chest', 'Legs');

-- CreateEnum
CREATE TYPE "EXERCISE_TYPE" AS ENUM ('Complex', 'Simple', 'Accessory');

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "exerciseType" "EXERCISE_TYPE" NOT NULL,
ADD COLUMN     "muscleGroup" "MUSCLE_GROUP" NOT NULL,
ADD COLUMN     "relatedInjuries" "INJURY_TYPE" NOT NULL;
