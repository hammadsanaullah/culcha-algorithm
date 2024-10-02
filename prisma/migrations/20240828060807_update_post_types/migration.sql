/*
  Warnings:

  - The values [Hyrox,ALL] on the enum `POST_CATEGORY` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "POST_CATEGORY_new" AS ENUM ('Hybrid', 'General', 'Nutrition', 'Running', 'OtherSports');
ALTER TABLE "Post" ALTER COLUMN "category" TYPE "POST_CATEGORY_new" USING ("category"::text::"POST_CATEGORY_new");
ALTER TYPE "POST_CATEGORY" RENAME TO "POST_CATEGORY_old";
ALTER TYPE "POST_CATEGORY_new" RENAME TO "POST_CATEGORY";
DROP TYPE "POST_CATEGORY_old";
COMMIT;
