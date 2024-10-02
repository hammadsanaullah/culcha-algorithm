/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "videoUrl" TEXT;

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Video";
