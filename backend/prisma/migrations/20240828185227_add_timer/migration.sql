-- CreateTable
CREATE TABLE "Timer" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "elapsedTime" INTEGER NOT NULL,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Timer_userId_key" ON "Timer"("userId");
