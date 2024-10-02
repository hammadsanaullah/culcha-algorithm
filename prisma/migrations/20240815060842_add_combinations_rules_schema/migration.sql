-- CreateEnum
CREATE TYPE "WORKOUT_COMBINATION_STATUS" AS ENUM ('Mandatory', 'Optional');

-- CreateEnum
CREATE TYPE "WORKOUT_COMBINATION_BEFORE_AFTER" AS ENUM ('Before', 'After');

-- CreateTable
CREATE TABLE "CombinationRules" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "comeAlone" "WORKOUT_TYPE"[],
    "notComeAlone" "WORKOUT_TYPE"[],
    "planId" TEXT NOT NULL,

    CONSTRAINT "CombinationRules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombinationRulesWorkoutTypes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workoutType" "WORKOUT_TYPE" NOT NULL,
    "combinationRulesId" TEXT NOT NULL,

    CONSTRAINT "CombinationRulesWorkoutTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutTypesCombinations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "WORKOUT_COMBINATION_STATUS" NOT NULL,
    "allocation" "WORKOUT_COMBINATION_BEFORE_AFTER" NOT NULL,
    "priority" INTEGER NOT NULL,
    "combinationWorkoutType" "WORKOUT_TYPE" NOT NULL,
    "combinationRulesWorkoutTypesId" TEXT NOT NULL,

    CONSTRAINT "WorkoutTypesCombinations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CombinationRules_planId_key" ON "CombinationRules"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "CombinationRulesWorkoutTypes_combinationRulesId_workoutType_key" ON "CombinationRulesWorkoutTypes"("combinationRulesId", "workoutType");

-- AddForeignKey
ALTER TABLE "CombinationRules" ADD CONSTRAINT "CombinationRules_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombinationRulesWorkoutTypes" ADD CONSTRAINT "CombinationRulesWorkoutTypes_combinationRulesId_fkey" FOREIGN KEY ("combinationRulesId") REFERENCES "CombinationRules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutTypesCombinations" ADD CONSTRAINT "WorkoutTypesCombinations_combinationRulesWorkoutTypesId_fkey" FOREIGN KEY ("combinationRulesWorkoutTypesId") REFERENCES "CombinationRulesWorkoutTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
