-- AlterTable
ALTER TABLE "Break" ADD COLUMN     "userClone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "userClone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "GeneratedExercises" ADD COLUMN     "userClone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PartExercises" ADD COLUMN     "userClone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "userClone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PlanSchedule" ADD COLUMN     "userClone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ScheduleWorkout" ADD COLUMN     "userClone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "userClone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WorkoutParts" ADD COLUMN     "userClone" BOOLEAN NOT NULL DEFAULT false;
