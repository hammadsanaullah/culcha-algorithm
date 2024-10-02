-- CreateEnum
CREATE TYPE "ACTIVITY" AS ENUM ('Running', 'Row', 'Swim', 'Bike', 'SkiErg', 'Calories');

-- CreateEnum
CREATE TYPE "WATCH_PROVIDERS" AS ENUM ('Polar', 'Fitbit', 'Garmin', 'Apple', 'Whoop');

-- CreateTable
CREATE TABLE "HealthData" (
    "id" TEXT NOT NULL,
    "activity" "ACTIVITY" NOT NULL,
    "provider" "WATCH_PROVIDERS" NOT NULL,
    "distance" DOUBLE PRECISION,
    "calories" DOUBLE PRECISION,
    "duration" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "HealthData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthData_userId_startDate_provider_activity_key" ON "HealthData"("userId", "startDate", "provider", "activity");

-- AddForeignKey
ALTER TABLE "HealthData" ADD CONSTRAINT "HealthData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
