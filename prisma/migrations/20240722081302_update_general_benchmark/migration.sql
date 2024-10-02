/*
  Warnings:

  - Added the required column `unit` to the `UserGeneralBenchmark` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `UserGeneralBenchmark` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserGeneralBenchmark" DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserGeneralBenchmark_userId_type_unit_key" ON "UserGeneralBenchmark"("userId", "type", "unit");
