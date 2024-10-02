-- CreateTable
CREATE TABLE "PlanDiscount" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "Plan_Status" NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "PlanDiscount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlanDiscount_planId_name_idx" ON "PlanDiscount"("planId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "PlanDiscount_name_planId_key" ON "PlanDiscount"("name", "planId");

-- AddForeignKey
ALTER TABLE "PlanDiscount" ADD CONSTRAINT "PlanDiscount_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
