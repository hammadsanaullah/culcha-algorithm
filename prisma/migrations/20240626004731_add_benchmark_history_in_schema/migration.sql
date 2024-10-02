-- CreateTable
CREATE TABLE "UserBenchmarkHistory" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userBenchmarkId" TEXT NOT NULL,

    CONSTRAINT "UserBenchmarkHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBenchmarkHistory" ADD CONSTRAINT "UserBenchmarkHistory_userBenchmarkId_fkey" FOREIGN KEY ("userBenchmarkId") REFERENCES "UserBenchmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;
