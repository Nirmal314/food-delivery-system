/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cartId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "orderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_orderId_key" ON "Cart"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_cartId_key" ON "Order"("cartId");
