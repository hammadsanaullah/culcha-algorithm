-- CreateTable
CREATE TABLE "WeekDayExercises" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "weekDaySettingId" TEXT NOT NULL,

    CONSTRAINT "WeekDayExercises_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeekDayExercises" ADD CONSTRAINT "WeekDayExercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekDayExercises" ADD CONSTRAINT "WeekDayExercises_weekDaySettingId_fkey" FOREIGN KEY ("weekDaySettingId") REFERENCES "WeekDaySetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
