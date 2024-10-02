-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "planSuperSetId" TEXT;

-- CreateTable
CREATE TABLE "PlanSuperSet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanSuperSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSuperSet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "WorkoutSuperSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkoutSuperSet_id_workoutId_idx" ON "WorkoutSuperSet"("id", "workoutId");

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_planSuperSetId_fkey" FOREIGN KEY ("planSuperSetId") REFERENCES "PlanSuperSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSuperSet" ADD CONSTRAINT "WorkoutSuperSet_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
