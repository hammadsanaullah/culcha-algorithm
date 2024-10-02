-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "WEIGHT" AS ENUM ('KG', 'LBS');

-- CreateEnum
CREATE TYPE "DISTANCE" AS ENUM ('Meters', 'Miles');

-- CreateTable
CREATE TABLE "Preferences" (
    "id" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "useCalendar" BOOLEAN NOT NULL,
    "periodDuration" TEXT NOT NULL,
    "cycleDuration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_userId_key" ON "Preferences"("userId");

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
