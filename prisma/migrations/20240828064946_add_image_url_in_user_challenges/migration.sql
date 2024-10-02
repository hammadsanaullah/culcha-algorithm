/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Challenge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "UserChallenges" ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "videoUrl" DROP NOT NULL;
