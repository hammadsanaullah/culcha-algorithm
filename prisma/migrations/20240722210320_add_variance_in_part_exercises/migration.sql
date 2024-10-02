-- AlterTable
ALTER TABLE "GeneratedExercises" ADD COLUMN     "variance" TEXT,
ALTER COLUMN "intensity" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PartExercises" ADD COLUMN     "variance" TEXT,
ALTER COLUMN "intensity" DROP NOT NULL;
