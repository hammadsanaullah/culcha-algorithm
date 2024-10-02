/*
  Warnings:

  - Added the required column `preferenceId` to the `MenstrualCycle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenstrualCycle" ADD COLUMN     "preferenceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MenstrualCycle" ADD CONSTRAINT "MenstrualCycle_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "Preferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
