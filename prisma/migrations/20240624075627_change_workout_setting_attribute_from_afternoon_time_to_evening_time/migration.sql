/*
  Warnings:

  - You are about to drop the column `afternoonTime` on the `WeekDaySetting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeekDaySetting" DROP COLUMN "afternoonTime",
ADD COLUMN     "eveningTime" TEXT;
