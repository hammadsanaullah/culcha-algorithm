/*
  Warnings:

  - You are about to drop the column `occurance` on the `WorkoutPriorityOccurance` table. All the data in the column will be lost.
  - Added the required column `occurrence` to the `WorkoutPriorityOccurance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutPriorityOccurance" DROP COLUMN "occurance",
ADD COLUMN     "occurrence" INTEGER NOT NULL;
