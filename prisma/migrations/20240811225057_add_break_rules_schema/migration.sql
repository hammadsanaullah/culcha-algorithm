-- CreateEnum
CREATE TYPE "BREAK_RULE_DAYS" AS ENUM ('HalfDayBefore', 'OneDayBefore', 'OneHalfDayBefore', 'TwoDayBefore', 'HalfDayAfter', 'OneDayAfter', 'OneHalfDayAfter', 'TwoDayAfter');

-- CreateTable
CREATE TABLE "BreakRules" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "day" "BREAK_RULE_DAYS" NOT NULL,
    "selectedWorkoutTypes" "WORKOUT_TYPE"[],
    "workoutType" "WORKOUT_TYPE" NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "BreakRules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BreakRules_workoutType_day_key" ON "BreakRules"("workoutType", "day");

-- AddForeignKey
ALTER TABLE "BreakRules" ADD CONSTRAINT "BreakRules_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
