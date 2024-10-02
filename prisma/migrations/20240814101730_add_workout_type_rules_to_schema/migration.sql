-- CreateEnum
CREATE TYPE "WORKOUT_TYPE_DAYS" AS ENUM ('OneDay', 'TwoDay', 'ThreeDay', 'FourDay', 'FiveDay', 'SixDay', 'SevenDay');

-- CreateTable
CREATE TABLE "WorkoutTypeRules" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "day" "WORKOUT_TYPE_DAYS" NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "WorkoutTypeRules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutPriorityOccurance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workoutType" "WORKOUT_TYPE" NOT NULL,
    "priority" INTEGER NOT NULL,
    "occurance" INTEGER NOT NULL,
    "WorkoutTypeRulesId" TEXT NOT NULL,

    CONSTRAINT "WorkoutPriorityOccurance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutTypeRules_day_planId_key" ON "WorkoutTypeRules"("day", "planId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutPriorityOccurance_workoutType_WorkoutTypeRulesId_key" ON "WorkoutPriorityOccurance"("workoutType", "WorkoutTypeRulesId");

-- AddForeignKey
ALTER TABLE "WorkoutTypeRules" ADD CONSTRAINT "WorkoutTypeRules_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPriorityOccurance" ADD CONSTRAINT "WorkoutPriorityOccurance_WorkoutTypeRulesId_fkey" FOREIGN KEY ("WorkoutTypeRulesId") REFERENCES "WorkoutTypeRules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
