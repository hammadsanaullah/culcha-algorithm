-- CreateEnum
CREATE TYPE "DURATION_DISCOUNT" AS ENUM ('One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Unlimited');

-- CreateTable
CREATE TABLE "AthleteDiscountPlan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "percentage" INTEGER NOT NULL,
    "duration" "DURATION_DISCOUNT" NOT NULL,
    "planId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AthleteDiscountPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AthleteDiscountPlan_planId_userId_key" ON "AthleteDiscountPlan"("planId", "userId");

-- AddForeignKey
ALTER TABLE "AthleteDiscountPlan" ADD CONSTRAINT "AthleteDiscountPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteDiscountPlan" ADD CONSTRAINT "AthleteDiscountPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
