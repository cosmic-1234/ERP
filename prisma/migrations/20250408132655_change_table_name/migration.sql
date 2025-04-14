/*
  Warnings:

  - You are about to drop the `invoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "invoice" DROP CONSTRAINT "invoice_salesorderid_fkey";

-- DropTable
DROP TABLE "invoice";

-- CreateTable
CREATE TABLE "billingdocument" (
    "id" SERIAL NOT NULL,
    "billingno" TEXT NOT NULL,
    "salesorderid" INTEGER NOT NULL,
    "billingdate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "billingdocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "billingdocument_billingno_key" ON "billingdocument"("billingno");

-- CreateIndex
CREATE UNIQUE INDEX "billingdocument_salesorderid_key" ON "billingdocument"("salesorderid");

-- AddForeignKey
ALTER TABLE "billingdocument" ADD CONSTRAINT "billingdocument_salesorderid_fkey" FOREIGN KEY ("salesorderid") REFERENCES "salesorder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
