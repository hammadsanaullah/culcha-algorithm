/*
  Warnings:

  - Changed the type of `periodDuration` on the `Preferences` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Preferences" DROP COLUMN "periodDuration",
ADD COLUMN     "periodDuration" INTEGER NOT NULL;
