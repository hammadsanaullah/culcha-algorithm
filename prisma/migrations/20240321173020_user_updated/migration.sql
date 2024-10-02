/*
  Warnings:

  - You are about to drop the column `appleID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAppleID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "appleID",
DROP COLUMN "isAppleID",
DROP COLUMN "phoneNumber",
ALTER COLUMN "fullName" DROP NOT NULL;
