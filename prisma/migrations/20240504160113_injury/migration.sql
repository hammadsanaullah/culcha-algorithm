-- CreateTable
CREATE TABLE "Injury" (
    "id" TEXT NOT NULL,
    "back" BOOLEAN NOT NULL DEFAULT false,
    "shoulder" BOOLEAN NOT NULL DEFAULT false,
    "knee" BOOLEAN NOT NULL DEFAULT false,
    "hip" BOOLEAN NOT NULL DEFAULT false,
    "ankle" BOOLEAN NOT NULL DEFAULT false,
    "achillsTendon" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Injury_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Injury_userId_key" ON "Injury"("userId");

-- CreateIndex
CREATE INDEX "Injury_userId_idx" ON "Injury"("userId");

-- AddForeignKey
ALTER TABLE "Injury" ADD CONSTRAINT "Injury_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
