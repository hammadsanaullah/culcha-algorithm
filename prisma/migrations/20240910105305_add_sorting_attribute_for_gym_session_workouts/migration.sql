/*
  Warnings:

  - You are about to drop the column `sortOrder` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ScheduleWorkout" ADD COLUMN     "sortOrder" SERIAL;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "sortOrder";
