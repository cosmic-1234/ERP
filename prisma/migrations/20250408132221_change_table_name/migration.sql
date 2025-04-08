/*
  Warnings:

  - You are about to drop the `billingdocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "billingdocument" DROP CONSTRAINT "billingdocument_salesorderid_fkey";

-- DropTable
DROP TABLE "billingdocument";

-- CreateTable
CREATE TABLE "invoice" (
    "id" SERIAL NOT NULL,
    "billingno" TEXT NOT NULL,
    "salesorderid" INTEGER NOT NULL,
    "billingdate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoice_billingno_key" ON "invoice"("billingno");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_salesorderid_key" ON "invoice"("salesorderid");

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_salesorderid_fkey" FOREIGN KEY ("salesorderid") REFERENCES "salesorder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
