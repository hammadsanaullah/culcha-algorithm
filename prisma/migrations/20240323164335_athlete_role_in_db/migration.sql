/*
  Warnings:

  - The values [USER] on the enum `RoleTitle` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleTitle_new" AS ENUM ('ATHLETE', 'ADMIN');
ALTER TABLE "Role" ALTER COLUMN "title" TYPE "RoleTitle_new" USING ("title"::text::"RoleTitle_new");
ALTER TYPE "RoleTitle" RENAME TO "RoleTitle_old";
ALTER TYPE "RoleTitle_new" RENAME TO "RoleTitle";
DROP TYPE "RoleTitle_old";
COMMIT;
