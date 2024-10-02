/*
  Warnings:

  - You are about to drop the column `workoutId` on the `Break` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Break" DROP COLUMN "workoutId";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "workoutId";
