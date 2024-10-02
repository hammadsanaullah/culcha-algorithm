-- CreateTable
CREATE TABLE "UserBenchmark" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserBenchmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserBenchmark_exerciseId_userId_idx" ON "UserBenchmark"("exerciseId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBenchmark_exerciseId_userId_key" ON "UserBenchmark"("exerciseId", "userId");

-- AddForeignKey
ALTER TABLE "UserBenchmark" ADD CONSTRAINT "UserBenchmark_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBenchmark" ADD CONSTRAINT "UserBenchmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
