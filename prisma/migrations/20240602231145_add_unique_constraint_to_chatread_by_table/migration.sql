/*
  Warnings:

  - A unique constraint covering the columns `[userId,chatId]` on the table `ChatReadBy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChatReadBy_userId_chatId_key" ON "ChatReadBy"("userId", "chatId");
