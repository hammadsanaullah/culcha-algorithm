/*
  Warnings:

  - The `phone` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `postalCode` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER,
DROP COLUMN "postalCode",
ADD COLUMN     "postalCode" INTEGER;
