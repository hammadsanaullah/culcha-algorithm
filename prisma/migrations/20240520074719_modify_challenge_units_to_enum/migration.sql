/*
  Warnings:

  - You are about to drop the column `reps` on the `UserChallenges` table. All the data in the column will be lost.
  - You are about to drop the column `timeCap` on the `UserChallenges` table. All the data in the column will be lost.
  - Changed the type of `unit` on the `Challenge` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `score` to the `UserChallenges` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UNIT" AS ENUM ('Time', 'Reps', 'Rounds', 'DistanceMeters', 'DistanceKiloMeters');

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "unit",
ADD COLUMN     "unit" "UNIT" NOT NULL;

-- AlterTable
ALTER TABLE "UserChallenges" DROP COLUMN "reps",
DROP COLUMN "timeCap",
ADD COLUMN     "score" TEXT NOT NULL;
