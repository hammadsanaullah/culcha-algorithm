/*
  Warnings:

  - You are about to drop the column `endDate` on the `MenstrualCycle` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `MenstrualCycle` table. All the data in the column will be lost.
  - Added the required column `date` to the `MenstrualCycle` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MenstrualCycle_userId_idx";

-- AlterTable
ALTER TABLE "MenstrualCycle" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "MenstrualCycle_userId_date_idx" ON "MenstrualCycle"("userId", "date");
