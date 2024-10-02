-- DropIndex
DROP INDEX "Subscription_userId_key";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "current" BOOLEAN NOT NULL DEFAULT true;
