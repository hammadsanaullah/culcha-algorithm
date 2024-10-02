/*
  Warnings:

  - The values [min,km,ml] on the enum `BENCHMARK_UNIT` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BENCHMARK_UNIT_new" AS ENUM ('kg', 'hr', 'reps', 'minKm', 'min500m', 'kcal', 'spm', 'watt', 'mlKmMin');
ALTER TABLE "UserBenchmark" ALTER COLUMN "unit" TYPE "BENCHMARK_UNIT_new" USING ("unit"::text::"BENCHMARK_UNIT_new");
ALTER TYPE "BENCHMARK_UNIT" RENAME TO "BENCHMARK_UNIT_old";
ALTER TYPE "BENCHMARK_UNIT_new" RENAME TO "BENCHMARK_UNIT";
DROP TYPE "BENCHMARK_UNIT_old";
COMMIT;
