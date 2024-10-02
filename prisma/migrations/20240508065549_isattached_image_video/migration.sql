-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "isAttached" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "isAttached" BOOLEAN NOT NULL DEFAULT false;
