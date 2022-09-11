/*
  Warnings:

  - You are about to drop the column `email` on the `Sessions` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Sessions_email_key";

-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "email",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
