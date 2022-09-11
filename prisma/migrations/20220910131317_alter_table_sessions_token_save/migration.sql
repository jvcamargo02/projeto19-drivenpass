/*
  Warnings:

  - You are about to drop the column `session` on the `Sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `Sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Sessions_session_key";

-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "session",
ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_token_key" ON "Sessions"("token");
