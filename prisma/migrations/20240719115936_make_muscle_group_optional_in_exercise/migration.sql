/*
  Warnings:

  - Made the column `exerciseType` on table `Exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "exerciseType" SET NOT NULL,
ALTER COLUMN "muscleGroup" DROP NOT NULL;
