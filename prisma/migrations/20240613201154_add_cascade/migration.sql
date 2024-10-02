-- DropForeignKey
ALTER TABLE "PartExercises" DROP CONSTRAINT "PartExercises_partId_fkey";

-- AddForeignKey
ALTER TABLE "PartExercises" ADD CONSTRAINT "PartExercises_partId_fkey" FOREIGN KEY ("partId") REFERENCES "WorkoutParts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
