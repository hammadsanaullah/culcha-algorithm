/*
  Warnings:

  - You are about to drop the column `workoutId` on the `WorkoutSuperSet` table. All the data in the column will be lost.
  - Added the required column `workoutSuperSetId` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkoutSuperSet" DROP CONSTRAINT "WorkoutSuperSet_workoutId_fkey";

-- DropIndex
DROP INDEX "WorkoutSuperSet_id_workoutId_idx";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "workoutSuperSetId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutSuperSet" DROP COLUMN "workoutId";

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_workoutSuperSetId_fkey" FOREIGN KEY ("workoutSuperSetId") REFERENCES "WorkoutSuperSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
