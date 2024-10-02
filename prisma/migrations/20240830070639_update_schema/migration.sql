/*
  Warnings:

  - You are about to drop the `IntensityRules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IntensityRules" DROP CONSTRAINT "IntensityRules_planId_fkey";

-- DropTable
DROP TABLE "IntensityRules";
