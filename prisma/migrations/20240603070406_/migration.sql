-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutParts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "position" INTEGER NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "WorkoutParts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "workoutId" TEXT NOT NULL,
    "workoutPartsId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Break" (
    "id" TEXT NOT NULL,
    "break" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "workoutId" TEXT NOT NULL,
    "workoutPartsId" TEXT,

    CONSTRAINT "Break_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartExercises" (
    "id" TEXT NOT NULL,
    "reps" TEXT NOT NULL,
    "intensity" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "partId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "fieldOne" TEXT NOT NULL,
    "fieldTwo" TEXT NOT NULL,

    CONSTRAINT "PartExercises_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Workout_name_idx" ON "Workout"("name");

-- CreateIndex
CREATE INDEX "WorkoutParts_name_idx" ON "WorkoutParts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PartExercises_partId_exerciseId_key" ON "PartExercises"("partId", "exerciseId");

-- AddForeignKey
ALTER TABLE "WorkoutParts" ADD CONSTRAINT "WorkoutParts_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_workoutPartsId_fkey" FOREIGN KEY ("workoutPartsId") REFERENCES "WorkoutParts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Break" ADD CONSTRAINT "Break_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Break" ADD CONSTRAINT "Break_workoutPartsId_fkey" FOREIGN KEY ("workoutPartsId") REFERENCES "WorkoutParts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartExercises" ADD CONSTRAINT "PartExercises_partId_fkey" FOREIGN KEY ("partId") REFERENCES "WorkoutParts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartExercises" ADD CONSTRAINT "PartExercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
