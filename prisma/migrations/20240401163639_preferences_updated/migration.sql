/*
  Warnings:

  - Added the required column `language` to the `Preferences` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `Preferences` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `weight` on the `Preferences` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `distance` on the `Preferences` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LANGUAGE" AS ENUM ('English', 'German');

-- AlterTable
ALTER TABLE "Preferences" ADD COLUMN     "language" "LANGUAGE" NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "GENDER" NOT NULL,
DROP COLUMN "weight",
ADD COLUMN     "weight" "WEIGHT" NOT NULL,
DROP COLUMN "distance",
ADD COLUMN     "distance" "DISTANCE" NOT NULL;
