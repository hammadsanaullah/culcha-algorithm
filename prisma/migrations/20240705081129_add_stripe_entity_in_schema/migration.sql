-- CreateTable
CREATE TABLE "Stripe" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stripe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stripe_userId_key" ON "Stripe"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Stripe_stripeCustomerId_key" ON "Stripe"("stripeCustomerId");

-- AddForeignKey
ALTER TABLE "Stripe" ADD CONSTRAINT "Stripe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
