-- CreateEnum
CREATE TYPE "BENCHMARKS" AS ENUM ('SameAsLast', 'OneRM', 'ThreeRM', 'RaceWeight', 'MaxReps', 'RIR', 'HRR', 'MinHR', 'MaxHR', 'BPM', 'RacePace', 'SPM', 'Watt', 'OnekBest', 'TwokBest', 'FivekBest', 'TenkBest', 'TwentyOnekBest', 'AssaultBike', 'Vo2Max');

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "benchmarks" "BENCHMARKS"[];
