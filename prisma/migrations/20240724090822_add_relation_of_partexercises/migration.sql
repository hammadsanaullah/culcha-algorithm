-- AlterTable
ALTER TABLE "UserBenchmarkScheduleWorkout" ADD COLUMN     "partExerciseId" TEXT;

-- AddForeignKey
ALTER TABLE "UserBenchmarkScheduleWorkout" ADD CONSTRAINT "UserBenchmarkScheduleWorkout_partExerciseId_fkey" FOREIGN KEY ("partExerciseId") REFERENCES "PartExercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
