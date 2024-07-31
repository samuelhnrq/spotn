-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Mixed');

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "artistGid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "debutYear" INTEGER NOT NULL,
    "members" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "genre" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "listens" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyArtist" (
    "id" SERIAL NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "DailyArtist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Artist_name_idx" ON "Artist"("name");

-- AddForeignKey
ALTER TABLE "DailyArtist" ADD CONSTRAINT "DailyArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
