/*
  Warnings:

  - You are about to drop the column `WorkoutTypeRulesId` on the `WorkoutPriorityOccurrence` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[workoutType,workoutTypeRulesId]` on the table `WorkoutPriorityOccurrence` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workoutTypeRulesId` to the `WorkoutPriorityOccurrence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkoutPriorityOccurrence" DROP CONSTRAINT "WorkoutPriorityOccurrence_WorkoutTypeRulesId_fkey";

-- DropIndex
DROP INDEX "WorkoutPriorityOccurrence_workoutType_WorkoutTypeRulesId_key";

-- AlterTable
ALTER TABLE "WorkoutPriorityOccurrence" DROP COLUMN "WorkoutTypeRulesId",
ADD COLUMN     "workoutTypeRulesId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutPriorityOccurrence_workoutType_workoutTypeRulesId_key" ON "WorkoutPriorityOccurrence"("workoutType", "workoutTypeRulesId");

-- AddForeignKey
ALTER TABLE "WorkoutPriorityOccurrence" ADD CONSTRAINT "WorkoutPriorityOccurrence_workoutTypeRulesId_fkey" FOREIGN KEY ("workoutTypeRulesId") REFERENCES "WorkoutTypeRules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
