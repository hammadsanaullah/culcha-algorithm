/*
  Warnings:

  - A unique constraint covering the columns `[planScheduleId,workoutId]` on the table `ScheduleWorkout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "UserBenchmarkScheduleWorkout" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "unit" "BENCHMARK_UNIT" NOT NULL,
    "type" "BENCHMARKS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scheduleWorkoutId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserBenchmarkScheduleWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserBenchmarkScheduleWorkout_exerciseId_userId_scheduleWork_idx" ON "UserBenchmarkScheduleWorkout"("exerciseId", "userId", "scheduleWorkoutId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBenchmarkScheduleWorkout_scheduleWorkoutId_exerciseId_u_key" ON "UserBenchmarkScheduleWorkout"("scheduleWorkoutId", "exerciseId", "userId", "type", "unit");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleWorkout_planScheduleId_workoutId_key" ON "ScheduleWorkout"("planScheduleId", "workoutId");

-- AddForeignKey
ALTER TABLE "UserBenchmarkScheduleWorkout" ADD CONSTRAINT "UserBenchmarkScheduleWorkout_scheduleWorkoutId_fkey" FOREIGN KEY ("scheduleWorkoutId") REFERENCES "ScheduleWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBenchmarkScheduleWorkout" ADD CONSTRAINT "UserBenchmarkScheduleWorkout_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBenchmarkScheduleWorkout" ADD CONSTRAINT "UserBenchmarkScheduleWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
