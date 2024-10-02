/*
  Warnings:

  - You are about to drop the column `holidayMode` on the `WeekDaySetting` table. All the data in the column will be lost.
  - You are about to drop the column `hyroxSimulation` on the `WeekDaySetting` table. All the data in the column will be lost.
  - You are about to drop the column `intensity` on the `WeekDaySetting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeekDaySetting" DROP COLUMN "holidayMode",
DROP COLUMN "hyroxSimulation",
DROP COLUMN "intensity";
