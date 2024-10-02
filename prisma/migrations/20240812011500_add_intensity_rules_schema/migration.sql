-- CreateTable
CREATE TABLE "IntensityRules" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "medium" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "IntensityRules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IntensityRules" ADD CONSTRAINT "IntensityRules_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
