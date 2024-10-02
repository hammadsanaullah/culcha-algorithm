/*
  Warnings:

  - You are about to drop the column `status` on the `UserPlan` table. All the data in the column will be lost.
  - Added the required column `status` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "status" "Plan_Status" NOT NULL;

-- AlterTable
ALTER TABLE "UserPlan" DROP COLUMN "status";
