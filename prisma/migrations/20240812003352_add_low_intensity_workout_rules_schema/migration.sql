-- CreateEnum
CREATE TYPE "IF_CLAUSE_LOW_INTENSITY" AS ENUM ('WarmUpIntervals', 'WarmUpStrengthUpperBody', 'WarmUpStrengthLowerBody', 'WarmUpErgs', 'WarmUpBike', 'WarmUpRaceSimulation', 'WarmUpGeneral', 'CoolDownRunning', 'CoolDownGym', 'CoolDownGeneral', 'StrengthFullBody', 'StrengthUpperBody', 'StrengthLowerBody', 'CardioBike', 'CardioMixedErgSession', 'CardioSkiErg', 'CardioRow', 'CardioAssBike', 'CardioIntervalRun', 'CardioThresholdRun', 'CardioSpeedRun', 'CardioLongRun', 'CardioTempoRun', 'CardioSwim', 'CardioLongCardioSession', 'WoDDuration', 'WoDFullBody', 'WoDUpperBody', 'WoDLowerBody', 'WoDMixed', 'HyroxHybrid', 'FinisherUpper', 'FinisherLower', 'RaceSimulation', 'Tapering', 'HolidayWorkout', 'LowIntensityWorkout');

-- CreateEnum
CREATE TYPE "THEN_CLAUSE_LOW_INTENSITY" AS ENUM ('LowIntensityWorkout', 'RestDay');

-- CreateTable
CREATE TABLE "LowIntensityWorkoutTypes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lowIntensityWorkoutTypes" "WORKOUT_TYPE"[],
    "planId" TEXT NOT NULL,

    CONSTRAINT "LowIntensityWorkoutTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LowIntensityRules" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ifClauses" "IF_CLAUSE_LOW_INTENSITY"[],
    "thenClause" "THEN_CLAUSE_LOW_INTENSITY" NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "LowIntensityRules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LowIntensityWorkoutTypes_planId_key" ON "LowIntensityWorkoutTypes"("planId");

-- AddForeignKey
ALTER TABLE "LowIntensityWorkoutTypes" ADD CONSTRAINT "LowIntensityWorkoutTypes_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LowIntensityRules" ADD CONSTRAINT "LowIntensityRules_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
