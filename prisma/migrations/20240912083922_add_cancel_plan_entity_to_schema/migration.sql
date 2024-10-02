-- CreateTable
CREATE TABLE "CancelledPlan" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CancelledPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CancelledPlan_planId_key" ON "CancelledPlan"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "CancelledPlan_userId_key" ON "CancelledPlan"("userId");

-- AddForeignKey
ALTER TABLE "CancelledPlan" ADD CONSTRAINT "CancelledPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CancelledPlan" ADD CONSTRAINT "CancelledPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
