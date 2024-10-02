-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "frequency" INTEGER,
ADD COLUMN     "relatedInjuries" "INJURY_TYPE"[];

-- CreateTable
CREATE TABLE "ExcludedAthletesWorkout" (
    "id" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ExcludedAthletesWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedExercises" (
    "id" TEXT NOT NULL,
    "benchmark" "BENCHMARKS" NOT NULL,
    "intensity" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "fieldOne" TEXT,
    "fieldTwo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partId" TEXT NOT NULL,
    "exerciseType" "EXERCISE_TYPE" NOT NULL,
    "muscleGroup" "MUSCLE_GROUP" NOT NULL,

    CONSTRAINT "GeneratedExercises_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExcludedAthletesWorkout" ADD CONSTRAINT "ExcludedAthletesWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcludedAthletesWorkout" ADD CONSTRAINT "ExcludedAthletesWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedExercises" ADD CONSTRAINT "GeneratedExercises_partId_fkey" FOREIGN KEY ("partId") REFERENCES "WorkoutParts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
