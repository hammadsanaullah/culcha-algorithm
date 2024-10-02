-- CreateTable
CREATE TABLE "UserChallenges" (
    "id" TEXT NOT NULL,
    "timeCap" TIMESTAMP(3) NOT NULL,
    "reps" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,

    CONSTRAINT "UserChallenges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserChallenges_userId_challengeId_idx" ON "UserChallenges"("userId", "challengeId");

-- AddForeignKey
ALTER TABLE "UserChallenges" ADD CONSTRAINT "UserChallenges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChallenges" ADD CONSTRAINT "UserChallenges_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
