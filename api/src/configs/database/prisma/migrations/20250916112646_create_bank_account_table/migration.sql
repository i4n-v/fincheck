-- CreateEnum
CREATE TYPE "public"."bank_account_type" AS ENUM ('CHECKING', 'INVESTIMENT', 'CASH');

-- CreateTable
CREATE TABLE "public"."bank_accounts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "initial_balance" DOUBLE PRECISION NOT NULL,
    "type" "public"."bank_account_type" NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);
