-- CreateTable
CREATE TABLE "verification" (
    "email" TEXT NOT NULL,
    "isverfied" BOOLEAN NOT NULL,
    "otp" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "verification_email_key" ON "verification"("email");
