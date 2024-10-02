/*
  Warnings:

  - Changed the type of `benchmark` on the `PartExercises` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PartExercises" DROP COLUMN "benchmark",
ADD COLUMN     "benchmark" "BENCHMARKS" NOT NULL;
