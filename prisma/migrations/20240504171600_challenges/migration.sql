/*
  Warnings:

  - Changed the type of `title` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ROLE_TITLE" AS ENUM ('ATHLETE', 'ADMIN');

-- CreateEnum
CREATE TYPE "WORKOUT_CATEGORY" AS ENUM ('Strength', 'Cardio');

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "title",
ADD COLUMN     "title" "ROLE_TITLE" NOT NULL;

-- DropEnum
DROP TYPE "RoleTitle";

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "WORKOUT_CATEGORY" NOT NULL,
    "videoUrl" TEXT,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "winnerAnnounceDate" TIMESTAMP(3),
    "unit" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Challenge_userId_idx" ON "Challenge"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_title_key" ON "Role"("title");

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
