-- CreateTable
CREATE TABLE "DeletedAccounts" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "accounts" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeletedAccounts_pkey" PRIMARY KEY ("id")
);
