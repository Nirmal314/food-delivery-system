-- DropIndex
DROP INDEX "Cart_restaurantId_key";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "restaurantId" DROP DEFAULT;
