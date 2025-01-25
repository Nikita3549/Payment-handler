/*
  Warnings:

  - You are about to drop the column `status_guid` on the `balance` table. All the data in the column will be lost.
  - You are about to drop the column `status_guid` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `balance_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders_status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BalanceStatus" AS ENUM ('in_proccess', 'paid');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('in_queue', 'in_proccess', 'completed');

-- DropForeignKey
ALTER TABLE "balance" DROP CONSTRAINT "balance_status_guid_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_status_guid_fkey";

-- AlterTable
ALTER TABLE "balance" DROP COLUMN "status_guid",
ADD COLUMN     "status" "BalanceStatus" NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status_guid",
ADD COLUMN     "status" "OrderStatus" NOT NULL;

-- DropTable
DROP TABLE "balance_status";

-- DropTable
DROP TABLE "orders_status";
