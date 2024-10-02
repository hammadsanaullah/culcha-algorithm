/*
  Warnings:

  - The values [SameAsLast] on the enum `BENCHMARKS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BENCHMARKS_new" AS ENUM ('OneRM', 'ThreeRM', 'RaceWeight', 'MaxReps', 'RIR', 'HRR', 'MinHR', 'MaxHR', 'BPM', 'RacePace', 'SPM', 'Watt', 'OnekBest', 'TwokBest', 'FivekBest', 'TenkBest', 'TwentyOnekBest', 'AssaultBike', 'Vo2Max');
ALTER TABLE "Exercise" ALTER COLUMN "benchmarks" TYPE "BENCHMARKS_new"[] USING ("benchmarks"::text::"BENCHMARKS_new"[]);
ALTER TABLE "UserBenchmark" ALTER COLUMN "type" TYPE "BENCHMARKS_new" USING ("type"::text::"BENCHMARKS_new");
ALTER TYPE "BENCHMARKS" RENAME TO "BENCHMARKS_old";
ALTER TYPE "BENCHMARKS_new" RENAME TO "BENCHMARKS";
DROP TYPE "BENCHMARKS_old";
COMMIT;
