/*
  Warnings:

  - You are about to drop the column `Row` on the `WeekDaySetting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeekDaySetting" DROP COLUMN "Row",
ADD COLUMN     "row" BOOLEAN;
