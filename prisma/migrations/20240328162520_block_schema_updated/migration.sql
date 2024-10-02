/*
  Warnings:

  - You are about to drop the column `blockTime` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Block` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Block" DROP COLUMN "blockTime",
DROP COLUMN "duration",
ADD COLUMN     "deleteOn" TIMESTAMP(3),
ADD COLUMN     "permanent" BOOLEAN NOT NULL DEFAULT true;
