/*
  Warnings:

  - You are about to drop the column `CustomerNo` on the `customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerno]` on the table `customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creditlimit` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerno` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentterms` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipcond` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "customer_CustomerNo_key";

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "CustomerNo",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "creditlimit" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "customerno" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "paymentterms" TEXT NOT NULL,
ADD COLUMN     "shipcond" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "material" (
    "id" SERIAL NOT NULL,
    "materialno" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uom" TEXT NOT NULL,
    "pricingdetails" JSONB NOT NULL,

    CONSTRAINT "material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salesorder" (
    "id" SERIAL NOT NULL,
    "orderno" TEXT NOT NULL,
    "customerid" INTEGER NOT NULL,
    "orderdate" TIMESTAMP(3) NOT NULL,
    "deliverydate" TIMESTAMP(3),
    "shippingaddress" TEXT NOT NULL,
    "paymentterms" TEXT NOT NULL,
    "shippingconditions" TEXT NOT NULL,

    CONSTRAINT "salesorder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salesorderitems" (
    "id" SERIAL NOT NULL,
    "salesorderid" INTEGER NOT NULL,
    "materialid" INTEGER NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "unitprice" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30),

    CONSTRAINT "salesorderitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery" (
    "id" SERIAL NOT NULL,
    "deliveryno" TEXT NOT NULL,
    "salesorderid" INTEGER NOT NULL,
    "deliverydate" TIMESTAMP(3) NOT NULL,
    "shippingaddress" TEXT NOT NULL,
    "goodsissuedate" TIMESTAMP(3),

    CONSTRAINT "delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billingdocument" (
    "id" SERIAL NOT NULL,
    "billingno" TEXT NOT NULL,
    "salesorderid" INTEGER NOT NULL,
    "billingdate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "billingdocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricingconditions" (
    "id" SERIAL NOT NULL,
    "conditiontype" TEXT NOT NULL,
    "customergroup" TEXT,
    "materialgroup" TEXT,
    "validfrom" TIMESTAMP(3) NOT NULL,
    "validto" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "pricingconditions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "material_materialno_key" ON "material"("materialno");

-- CreateIndex
CREATE UNIQUE INDEX "salesorder_orderno_key" ON "salesorder"("orderno");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_deliveryno_key" ON "delivery"("deliveryno");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_salesorderid_key" ON "delivery"("salesorderid");

-- CreateIndex
CREATE UNIQUE INDEX "billingdocument_billingno_key" ON "billingdocument"("billingno");

-- CreateIndex
CREATE UNIQUE INDEX "billingdocument_salesorderid_key" ON "billingdocument"("salesorderid");

-- CreateIndex
CREATE UNIQUE INDEX "customer_customerno_key" ON "customer"("customerno");

-- AddForeignKey
ALTER TABLE "salesorder" ADD CONSTRAINT "salesorder_customerid_fkey" FOREIGN KEY ("customerid") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salesorderitems" ADD CONSTRAINT "salesorderitems_salesorderid_fkey" FOREIGN KEY ("salesorderid") REFERENCES "salesorder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salesorderitems" ADD CONSTRAINT "salesorderitems_materialid_fkey" FOREIGN KEY ("materialid") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_salesorderid_fkey" FOREIGN KEY ("salesorderid") REFERENCES "salesorder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billingdocument" ADD CONSTRAINT "billingdocument_salesorderid_fkey" FOREIGN KEY ("salesorderid") REFERENCES "salesorder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
