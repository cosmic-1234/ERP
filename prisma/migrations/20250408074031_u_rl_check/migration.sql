-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "CustomerNo" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_CustomerNo_key" ON "customer"("CustomerNo");
