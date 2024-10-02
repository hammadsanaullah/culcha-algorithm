-- CreateTable
CREATE TABLE "FeedbackPlanSchedule" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "answerOne" TEXT,
    "ratingOne" INTEGER NOT NULL,
    "answerTwo" TEXT,
    "ratingTwo" INTEGER NOT NULL,
    "answerThree" TEXT,
    "ratingThree" INTEGER NOT NULL,
    "planScheduleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FeedbackPlanSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeedbackPlanSchedule" ADD CONSTRAINT "FeedbackPlanSchedule_planScheduleId_fkey" FOREIGN KEY ("planScheduleId") REFERENCES "PlanSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackPlanSchedule" ADD CONSTRAINT "FeedbackPlanSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
