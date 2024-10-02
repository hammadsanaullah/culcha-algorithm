/*
  Warnings:

  - You are about to drop the column `reps` on the `PartExercises` table. All the data in the column will be lost.
  - Added the required column `benchmark` to the `PartExercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PartExercises" DROP COLUMN "reps",
ADD COLUMN     "benchmark" TEXT NOT NULL,
ALTER COLUMN "intensity" SET DATA TYPE TEXT;
