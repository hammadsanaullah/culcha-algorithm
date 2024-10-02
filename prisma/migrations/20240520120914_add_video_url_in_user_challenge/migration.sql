/*
  Warnings:

  - Added the required column `videoUrl` to the `UserChallenges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserChallenges" ADD COLUMN     "videoUrl" TEXT NOT NULL;
