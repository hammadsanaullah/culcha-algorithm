-- CreateEnum
CREATE TYPE "Plan_Status" AS ENUM ('Active', 'Inactive');

-- CreateTable
CREATE TABLE "UserPlan" (
    "id" TEXT NOT NULL,
    "status" "Plan_Status" NOT NULL,
    "current" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPlan_pkey" PRIMARY KEY ("id")
);
