/*
  Warnings:

  - A unique constraint covering the columns `[userId,challengeId]` on the table `UserChallenges` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserChallenges_userId_challengeId_key" ON "UserChallenges"("userId", "challengeId");
