-- CreateTable
CREATE TABLE "RestDayRules" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "days" INTEGER NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "RestDayRules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RestDayRules_planId_key" ON "RestDayRules"("planId");

-- AddForeignKey
ALTER TABLE "RestDayRules" ADD CONSTRAINT "RestDayRules_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
