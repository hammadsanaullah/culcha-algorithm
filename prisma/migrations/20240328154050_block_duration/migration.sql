/*
  Warnings:

  - Made the column `duration` on table `Block` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Block" ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "duration" SET DEFAULT 0;
