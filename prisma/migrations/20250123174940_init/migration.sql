-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "content" (
    "guid" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "users" (
    "guid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "name" TEXT,
    "birthday" INTEGER,
    "gender" "gender",
    "balance" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "tariffs" (
    "guid" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "archive" BOOLEAN NOT NULL DEFAULT false,
    "amount" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "tariffs_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "services" (
    "guid" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "archive" BOOLEAN NOT NULL DEFAULT false,
    "cost" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "orders_status" (
    "guid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "orders_status_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "orders" (
    "guid" TEXT NOT NULL,
    "user_guid" TEXT NOT NULL,
    "service_guid" TEXT NOT NULL,
    "dateCreate" INTEGER NOT NULL,
    "dateUpdate" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "status_guid" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "balance_status" (
    "guid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "balance_status_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "balance" (
    "guid" TEXT NOT NULL,
    "user_guid" TEXT NOT NULL,
    "date_create" INTEGER NOT NULL,
    "date_update" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "tariff_guid" TEXT NOT NULL,
    "service_guid" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "status_guid" TEXT NOT NULL,

    CONSTRAINT "balance_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_guid_fkey" FOREIGN KEY ("user_guid") REFERENCES "users"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_service_guid_fkey" FOREIGN KEY ("service_guid") REFERENCES "services"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_status_guid_fkey" FOREIGN KEY ("status_guid") REFERENCES "orders_status"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balance" ADD CONSTRAINT "balance_user_guid_fkey" FOREIGN KEY ("user_guid") REFERENCES "users"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balance" ADD CONSTRAINT "balance_tariff_guid_fkey" FOREIGN KEY ("tariff_guid") REFERENCES "tariffs"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balance" ADD CONSTRAINT "balance_service_guid_fkey" FOREIGN KEY ("service_guid") REFERENCES "services"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balance" ADD CONSTRAINT "balance_status_guid_fkey" FOREIGN KEY ("status_guid") REFERENCES "balance_status"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;
