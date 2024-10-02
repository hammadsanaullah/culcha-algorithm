/*
  Warnings:

  - A unique constraint covering the columns `[exerciseId,userId,type,unit]` on the table `UserBenchmark` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserBenchmark_exerciseId_userId_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserBenchmark_exerciseId_userId_type_unit_key" ON "UserBenchmark"("exerciseId", "userId", "type", "unit");
