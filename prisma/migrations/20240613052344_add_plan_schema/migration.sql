-- CreateEnum
CREATE TYPE "GYM_SESSION" AS ENUM ('Morining', 'Afternoon');

-- CreateEnum
CREATE TYPE "DAY" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanSchedule" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "week" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "gymSession" "GYM_SESSION" NOT NULL,
    "day" "DAY" NOT NULL,
    "description" TEXT NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "PlanSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "planScheduleId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "ScheduleWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Plan_name_type_idx" ON "Plan"("name", "type");

-- AddForeignKey
ALTER TABLE "PlanSchedule" ADD CONSTRAINT "PlanSchedule_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleWorkout" ADD CONSTRAINT "ScheduleWorkout_planScheduleId_fkey" FOREIGN KEY ("planScheduleId") REFERENCES "PlanSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleWorkout" ADD CONSTRAINT "ScheduleWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
