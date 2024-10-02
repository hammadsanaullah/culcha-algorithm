/*
  Warnings:

  - The values [Morining] on the enum `GYM_SESSION` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GYM_SESSION_new" AS ENUM ('Morning', 'Evening');
ALTER TABLE "PlanSchedule" ALTER COLUMN "gymSession" TYPE "GYM_SESSION_new" USING ("gymSession"::text::"GYM_SESSION_new");
ALTER TYPE "GYM_SESSION" RENAME TO "GYM_SESSION_old";
ALTER TYPE "GYM_SESSION_new" RENAME TO "GYM_SESSION";
DROP TYPE "GYM_SESSION_old";
COMMIT;
