/*
  Warnings:

  - Changed the type of `type` on the `Workout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WORKOUT_TYPE" AS ENUM ('StrengthFullBody', 'StrengthUpperBody', 'StrengthLowerBody', 'CardioBike', 'CardioMixedErgSession', 'CardioSkiErg', 'CardioRow', 'CardioAssBike', 'CardioIntervalRun', 'CardioThresholdRun', 'CardioSpeedRun', 'CardioLongRun', 'CardioTempoRun', 'CardioSwim', 'CardioLongCardioSession', 'WoDDuration', 'WoDFullBody', 'WoDUpperBody', 'WoDLowerBody', 'WoDMixed', 'HyroxHybrid', 'FinisherUpper', 'FinisherLower');

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "type",
ADD COLUMN     "type" "WORKOUT_TYPE" NOT NULL;
