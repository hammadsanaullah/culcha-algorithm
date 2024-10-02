-- DropForeignKey
ALTER TABLE "Break" DROP CONSTRAINT "Break_workoutPartsId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_workoutPartsId_fkey";

-- DropForeignKey
ALTER TABLE "PartExercises" DROP CONSTRAINT "PartExercises_exerciseId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_workoutPartsId_fkey" FOREIGN KEY ("workoutPartsId") REFERENCES "WorkoutParts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Break" ADD CONSTRAINT "Break_workoutPartsId_fkey" FOREIGN KEY ("workoutPartsId") REFERENCES "WorkoutParts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartExercises" ADD CONSTRAINT "PartExercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
