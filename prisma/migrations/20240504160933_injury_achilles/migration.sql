/*
  Warnings:

  - You are about to drop the column `achillsTendon` on the `Injury` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Injury" DROP COLUMN "achillsTendon",
ADD COLUMN     "achillesTendon" BOOLEAN NOT NULL DEFAULT false;
