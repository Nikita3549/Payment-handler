/*
  Warnings:

  - The values [in_proccess] on the enum `BalanceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [in_proccess] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BalanceStatus_new" AS ENUM ('in_process', 'paid');
ALTER TABLE "balance" ALTER COLUMN "status" TYPE "BalanceStatus_new" USING ("status"::text::"BalanceStatus_new");
ALTER TYPE "BalanceStatus" RENAME TO "BalanceStatus_old";
ALTER TYPE "BalanceStatus_new" RENAME TO "BalanceStatus";
DROP TYPE "BalanceStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('in_queue', 'in_process', 'completed');
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "balance" DROP CONSTRAINT "balance_service_guid_fkey";

-- DropForeignKey
ALTER TABLE "balance" DROP CONSTRAINT "balance_tariff_guid_fkey";

-- AlterTable
ALTER TABLE "balance" ALTER COLUMN "tariff_guid" DROP NOT NULL,
ALTER COLUMN "service_guid" DROP NOT NULL,
ALTER COLUMN "transaction_id" DROP NOT NULL;
