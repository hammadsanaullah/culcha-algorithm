-- CreateEnum
CREATE TYPE "PERIOD_RULE_DAYS" AS ENUM ('OneDayBefore', 'TwoDayBefore', 'PeriodDay', 'OneDayAfter', 'TwoDayAfter', 'ThreeDayAfter', 'FourDayAfter', 'FiveDayAfter');

-- CreateTable
CREATE TABLE "PeriodDayRules" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "daysBefore" INTEGER NOT NULL,
    "daysAfter" INTEGER NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "PeriodDayRules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeriodRules" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gymSession" "GYM_SESSION" NOT NULL,
    "day" "PERIOD_RULE_DAYS" NOT NULL,
    "planId" TEXT NOT NULL,
    "workoutId" TEXT,

    CONSTRAINT "PeriodRules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeriodMaxWorkouts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "maxPerWeek" INTEGER NOT NULL,
    "workoutType" "WORKOUT_TYPE" NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "PeriodMaxWorkouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PeriodDayRules_planId_key" ON "PeriodDayRules"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "PeriodRules_gymSession_day_planId_key" ON "PeriodRules"("gymSession", "day", "planId");

-- CreateIndex
CREATE UNIQUE INDEX "PeriodMaxWorkouts_maxPerWeek_workoutType_planId_key" ON "PeriodMaxWorkouts"("maxPerWeek", "workoutType", "planId");

-- AddForeignKey
ALTER TABLE "PeriodDayRules" ADD CONSTRAINT "PeriodDayRules_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeriodRules" ADD CONSTRAINT "PeriodRules_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeriodRules" ADD CONSTRAINT "PeriodRules_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeriodMaxWorkouts" ADD CONSTRAINT "PeriodMaxWorkouts_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
