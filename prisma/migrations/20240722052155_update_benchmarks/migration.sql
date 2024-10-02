/*
  Warnings:

  - The values [MaxReps,MinHR,BPM,RacePace,OnekBest,TenkBest,TwentyOnekBest,AssaultBike,FourtyTwokBest,StandardWorkoutWeight,BodyWeight] on the enum `BENCHMARKS` will be removed. If these variants are still used in the database, this will fail.
  - The values [hr,reps] on the enum `BENCHMARK_UNIT` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BENCHMARKS_new" AS ENUM ('NoBenchmark', 'RPE', 'RIR', 'OneRM', 'ThreeRM', 'StandardWorkoutWeightSixEightReps', 'StandardWorkoutWeightTenTwelveReps', 'StandardWorkoutWeightThirteenFifteenReps', 'RaceWeight', 'BodyWeightNoWeight', 'RunningRacePace', 'FivekPB', 'TenkPB', 'HalfMarathon', 'Marathon', 'NoseBreathing', 'HRR', 'MaxHR', 'RestHR', 'FTP', 'WattKg', 'TwokBest', 'FivekBest', 'ErgsRacePace', 'AssBikeWatt', 'AssBikekCal', 'MinHundredM', 'Watt', 'kCal', 'SPM', 'Vo2Max');
ALTER TABLE "Exercise" ALTER COLUMN "benchmarks" TYPE "BENCHMARKS_new"[] USING ("benchmarks"::text::"BENCHMARKS_new"[]);
ALTER TABLE "UserBenchmark" ALTER COLUMN "type" TYPE "BENCHMARKS_new" USING ("type"::text::"BENCHMARKS_new");
ALTER TABLE "UserBenchmarkScheduleWorkout" ALTER COLUMN "type" TYPE "BENCHMARKS_new" USING ("type"::text::"BENCHMARKS_new");
ALTER TABLE "PartExercises" ALTER COLUMN "benchmark" TYPE "BENCHMARKS_new" USING ("benchmark"::text::"BENCHMARKS_new");
ALTER TYPE "BENCHMARKS" RENAME TO "BENCHMARKS_old";
ALTER TYPE "BENCHMARKS_new" RENAME TO "BENCHMARKS";
DROP TYPE "BENCHMARKS_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "BENCHMARK_UNIT_new" AS ENUM ('kg', 'lbs', 'bpm', 'minKm', 'mmSs', 'hhMmSs', 'min500m', 'min100m', 'kcal', 'spm', 'watt', 'mlKmMin');
ALTER TABLE "UserBenchmark" ALTER COLUMN "unit" TYPE "BENCHMARK_UNIT_new" USING ("unit"::text::"BENCHMARK_UNIT_new");
ALTER TABLE "UserBenchmarkScheduleWorkout" ALTER COLUMN "unit" TYPE "BENCHMARK_UNIT_new" USING ("unit"::text::"BENCHMARK_UNIT_new");
ALTER TYPE "BENCHMARK_UNIT" RENAME TO "BENCHMARK_UNIT_old";
ALTER TYPE "BENCHMARK_UNIT_new" RENAME TO "BENCHMARK_UNIT";
DROP TYPE "BENCHMARK_UNIT_old";
COMMIT;
