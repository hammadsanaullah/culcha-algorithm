/*
  Warnings:

  - You are about to drop the `DeletedAccounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DeletedAccounts";

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "count" INTEGER,
    "accounts" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
