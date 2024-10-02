/*
  Warnings:

  - The values [Back,Shoulder,Bicep,Tricep,Chest,Legs] on the enum `MUSCLE_GROUP` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MUSCLE_GROUP_new" AS ENUM ('UpperBodyChest', 'UpperBodyBackRhomboids', 'UpperBodyBackLats', 'UpperBodyShoulder', 'UpperBodyBiceps', 'UpperBodyTriceps', 'UpperBodyForearms', 'UpperBodyCore', 'LowerBodyLowerBack', 'LowerBodyQuadriceps', 'LowerBodyHamstring', 'LowerBodyCalves', 'LowerBodyGlutes');
ALTER TABLE "Exercise" ALTER COLUMN "muscleGroup" TYPE "MUSCLE_GROUP_new" USING ("muscleGroup"::text::"MUSCLE_GROUP_new");
ALTER TYPE "MUSCLE_GROUP" RENAME TO "MUSCLE_GROUP_old";
ALTER TYPE "MUSCLE_GROUP_new" RENAME TO "MUSCLE_GROUP";
DROP TYPE "MUSCLE_GROUP_old";
COMMIT;
