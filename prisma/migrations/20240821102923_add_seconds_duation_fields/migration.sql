-- AlterTable
ALTER TABLE "WeekDaySetting" ADD COLUMN     "eveningTimeSeconds" INTEGER,
ADD COLUMN     "morningTimeSeconds" INTEGER;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "durationSeconds" INTEGER;
