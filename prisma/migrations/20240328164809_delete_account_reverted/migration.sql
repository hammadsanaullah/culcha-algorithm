/*
  Warnings:

  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Activity";

-- CreateTable
CREATE TABLE "DeletedAccounts" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "accounts" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeletedAccounts_pkey" PRIMARY KEY ("id")
);
