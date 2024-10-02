-- AlterTable
ALTER TABLE "UserBenchmarkHistory" ADD COLUMN     "userGeneralBenchmarkId" TEXT,
ALTER COLUMN "userBenchmarkId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "UserGeneralBenchmark" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "unit" "BENCHMARK_UNIT",
    "type" "BENCHMARKS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserGeneralBenchmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserGeneralBenchmark_userId_idx" ON "UserGeneralBenchmark"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGeneralBenchmark_userId_type_unit_key" ON "UserGeneralBenchmark"("userId", "type", "unit");

-- AddForeignKey
ALTER TABLE "UserGeneralBenchmark" ADD CONSTRAINT "UserGeneralBenchmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBenchmarkHistory" ADD CONSTRAINT "UserBenchmarkHistory_userGeneralBenchmarkId_fkey" FOREIGN KEY ("userGeneralBenchmarkId") REFERENCES "UserGeneralBenchmark"("id") ON DELETE SET NULL ON UPDATE CASCADE;
