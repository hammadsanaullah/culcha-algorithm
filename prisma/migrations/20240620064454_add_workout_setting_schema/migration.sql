-- CreateEnum
CREATE TYPE "INTENSITY" AS ENUM ('High', 'Medium', 'Low');

-- AlterEnum
ALTER TYPE "GYM_SESSION" ADD VALUE 'Both';

-- CreateTable
CREATE TABLE "WorkoutSetting" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "raceDay" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkoutSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeekDaySetting" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "day" "DAY" NOT NULL,
    "session" "GYM_SESSION" NOT NULL,
    "morningTime" TEXT,
    "afternoonTime" TEXT,
    "intensity" "INTENSITY" NOT NULL,
    "Row" BOOLEAN,
    "wallBalls" BOOLEAN,
    "sledPush" BOOLEAN,
    "sledPull" BOOLEAN,
    "skiErg" BOOLEAN,
    "treadMill" BOOLEAN,
    "trainingOutside" BOOLEAN,
    "bike" BOOLEAN,
    "assBike" BOOLEAN,
    "crossTrainer" BOOLEAN,
    "stairMaster" BOOLEAN,
    "holidayMode" BOOLEAN,
    "hyroxSimulation" BOOLEAN,
    "workoutSettingId" TEXT NOT NULL,

    CONSTRAINT "WeekDaySetting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutSetting" ADD CONSTRAINT "WorkoutSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekDaySetting" ADD CONSTRAINT "WeekDaySetting_workoutSettingId_fkey" FOREIGN KEY ("workoutSettingId") REFERENCES "WorkoutSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
