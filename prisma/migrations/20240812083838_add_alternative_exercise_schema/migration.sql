-- CreateTable
CREATE TABLE "AlternativeExerciseRules" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fieldOne" TEXT,
    "fieldTwo" TEXT,
    "benchmark" "BENCHMARKS" NOT NULL,
    "intensity" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "alternativeExerciseId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "AlternativeExerciseRules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AlternativeExerciseRules" ADD CONSTRAINT "AlternativeExerciseRules_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlternativeExerciseRules" ADD CONSTRAINT "AlternativeExerciseRules_alternativeExerciseId_fkey" FOREIGN KEY ("alternativeExerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlternativeExerciseRules" ADD CONSTRAINT "AlternativeExerciseRules_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
