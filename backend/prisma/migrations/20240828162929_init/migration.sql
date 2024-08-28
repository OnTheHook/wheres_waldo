-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "found" BOOLEAN NOT NULL DEFAULT false,
    "xPercent" DECIMAL(65,30) NOT NULL,
    "yPercent" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
