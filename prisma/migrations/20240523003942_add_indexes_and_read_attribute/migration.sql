/*
  Warnings:

  - A unique constraint covering the columns `[groupId,userId]` on the table `UserGroups` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ChatReadBy" ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Chat_groupId_senderId_idx" ON "Chat"("groupId", "senderId");

-- CreateIndex
CREATE INDEX "ChatReadBy_userId_chatId_idx" ON "ChatReadBy"("userId", "chatId");

-- CreateIndex
CREATE INDEX "Group_userId_participantId_type_idx" ON "Group"("userId", "participantId", "type");

-- CreateIndex
CREATE INDEX "UserGroups_groupId_userId_idx" ON "UserGroups"("groupId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroups_groupId_userId_key" ON "UserGroups"("groupId", "userId");
