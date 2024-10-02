-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "WORKOUT_TYPE" ADD VALUE 'WarmUpIntervals';
ALTER TYPE "WORKOUT_TYPE" ADD VALUE 'WarmUpStrengthUpperBody';
ALTER TYPE "WORKOUT_TYPE" ADD VALUE 'WarmUpStrengthLowerBody';
ALTER TYPE "WORKOUT_TYPE" ADD VALUE 'WarmUpErgs';
ALTER TYPE "WORKOUT_TYPE" ADD VALUE 'WarmUpBike';
ALTER TYPE "WORKOUT_TYPE" ADD VALUE 'WarmUpRaceSimulation';
ALTER TYPE "WORKOUT_TYPE" ADD VALUE 'WarmUpGeneral';
ALTER TYPE "WORKOUT_TYPE" ADD VALUE 'CoolDownRunning';
ALTER TYPE "WORKOUT_TYPE" ADD VALUE 'CoolDownGym';
ALTER TYPE "WORKOUT_TYPE" ADD VALUE 'CoolDownGeneral';
