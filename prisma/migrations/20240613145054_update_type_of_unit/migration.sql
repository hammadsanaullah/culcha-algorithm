/*
  Warnings:

  - Changed the type of `unit` on the `UserBenchmark` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserBenchmark" DROP COLUMN "unit",
ADD COLUMN     "unit" "BENCHMARK_UNIT" NOT NULL;
