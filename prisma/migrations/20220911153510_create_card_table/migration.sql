-- CreateEnum
CREATE TYPE "Role" AS ENUM ('credit', 'debit', 'both');

-- CreateTable
CREATE TABLE "Cards" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "holderName" TEXT NOT NULL,
    "securityCode" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "type" "Role" NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
