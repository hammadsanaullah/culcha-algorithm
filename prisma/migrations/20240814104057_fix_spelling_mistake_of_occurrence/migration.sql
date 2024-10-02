/*
  Warnings:

  - You are about to drop the `WorkoutPriorityOccurance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkoutPriorityOccurance" DROP CONSTRAINT "WorkoutPriorityOccurance_WorkoutTypeRulesId_fkey";

-- DropTable
DROP TABLE "WorkoutPriorityOccurance";

-- CreateTable
CREATE TABLE "WorkoutPriorityOccurrence" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workoutType" "WORKOUT_TYPE" NOT NULL,
    "priority" INTEGER NOT NULL,
    "occurrence" INTEGER NOT NULL,
    "WorkoutTypeRulesId" TEXT NOT NULL,

    CONSTRAINT "WorkoutPriorityOccurrence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutPriorityOccurrence_workoutType_WorkoutTypeRulesId_key" ON "WorkoutPriorityOccurrence"("workoutType", "WorkoutTypeRulesId");

-- AddForeignKey
ALTER TABLE "WorkoutPriorityOccurrence" ADD CONSTRAINT "WorkoutPriorityOccurrence_WorkoutTypeRulesId_fkey" FOREIGN KEY ("WorkoutTypeRulesId") REFERENCES "WorkoutTypeRules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
