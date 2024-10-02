/*
  Warnings:

  - The `duration` column on the `Block` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Block" ADD COLUMN     "blockTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER;
