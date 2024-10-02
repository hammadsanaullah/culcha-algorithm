/*
  Warnings:

  - A unique constraint covering the columns `[userId,planScheduleId]` on the table `FeedbackPlanSchedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FeedbackPlanSchedule_userId_planScheduleId_key" ON "FeedbackPlanSchedule"("userId", "planScheduleId");
