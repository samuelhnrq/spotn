/*
  Warnings:

  - A unique constraint covering the columns `[artistGid]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artist_artistGid_key" ON "Artist"("artistGid");
