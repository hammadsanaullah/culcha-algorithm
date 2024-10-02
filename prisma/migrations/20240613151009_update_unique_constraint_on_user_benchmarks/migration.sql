/*
  Warnings:

  - A unique constraint covering the columns `[exerciseId,userId,type]` on the table `UserBenchmark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserBenchmark_exerciseId_userId_type_key" ON "UserBenchmark"("exerciseId", "userId", "type");
