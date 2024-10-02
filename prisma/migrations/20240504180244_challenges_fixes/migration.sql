/*
  Warnings:

  - Made the column `videoUrl` on table `Challenge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startTime` on table `Challenge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endTime` on table `Challenge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `winnerAnnounceDate` on table `Challenge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unit` on table `Challenge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Challenge` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Challenge" ALTER COLUMN "videoUrl" SET NOT NULL,
ALTER COLUMN "startTime" SET NOT NULL,
ALTER COLUMN "endTime" SET NOT NULL,
ALTER COLUMN "winnerAnnounceDate" SET NOT NULL,
ALTER COLUMN "unit" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
