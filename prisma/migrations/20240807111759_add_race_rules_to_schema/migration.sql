-- CreateEnum
CREATE TYPE "RACE_DAY" AS ENUM ('Friday', 'Saturday', 'Sunday');

-- CreateEnum
CREATE TYPE "RACE_RULE_TYPE" AS ENUM ('Race', 'RaceSimulation');

-- CreateTable
CREATE TABLE "RaceRules" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "raceDay" "RACE_DAY" NOT NULL,
    "weekDay" "DAY" NOT NULL,
    "gymSession" "GYM_SESSION" NOT NULL,
    "type" "RACE_RULE_TYPE" NOT NULL,
    "planId" TEXT NOT NULL,
    "workoutId" TEXT,

    CONSTRAINT "RaceRules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RaceRules" ADD CONSTRAINT "RaceRules_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceRules" ADD CONSTRAINT "RaceRules_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
