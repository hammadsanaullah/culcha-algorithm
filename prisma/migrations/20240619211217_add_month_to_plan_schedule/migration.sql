/*
  Warnings:

  - Added the required column `month` to the `PlanSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MONTH" AS ENUM ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

-- AlterTable
ALTER TABLE "PlanSchedule" ADD COLUMN     "month" "MONTH" NOT NULL;
