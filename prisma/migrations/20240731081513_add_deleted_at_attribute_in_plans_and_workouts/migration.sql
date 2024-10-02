-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "deletedAt" TIMESTAMP(3);
