-- CreateTable
CREATE TABLE "Sessions" (
    "id" SERIAL NOT NULL,
    "session" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_session_key" ON "Sessions"("session");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_email_key" ON "Sessions"("email");
