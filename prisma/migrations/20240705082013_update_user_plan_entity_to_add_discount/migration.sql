-- AlterTable
ALTER TABLE "UserPlan" ADD COLUMN     "planDiscountId" TEXT;

-- AddForeignKey
ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_planDiscountId_fkey" FOREIGN KEY ("planDiscountId") REFERENCES "PlanDiscount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
