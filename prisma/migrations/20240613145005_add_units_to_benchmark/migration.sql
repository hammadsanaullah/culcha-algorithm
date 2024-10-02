/*
  Warnings:

  - Added the required column `unit` to the `UserBenchmark` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BENCHMARK_UNIT" AS ENUM ('kg', 'hr', 'reps', 'min', 'km', 'kcal', 'ml', 'spm', 'watt');

-- DropIndex
DROP INDEX "UserBenchmark_exerciseId_userId_key";

-- AlterTable
ALTER TABLE "UserBenchmark" ADD COLUMN     "unit" "UNIT" NOT NULL;
