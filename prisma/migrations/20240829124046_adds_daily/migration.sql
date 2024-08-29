-- CreateTable
CREATE TABLE "UserGuess" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "dayId" INTEGER NOT NULL,
    "guessId" INTEGER NOT NULL,

    CONSTRAINT "UserGuess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserGuess_userId_idx" ON "UserGuess"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGuess_userId_guessId_dayId_key" ON "UserGuess"("userId", "guessId", "dayId");

-- AddForeignKey
ALTER TABLE "UserGuess" ADD CONSTRAINT "UserGuess_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "daily_entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGuess" ADD CONSTRAINT "UserGuess_guessId_fkey" FOREIGN KEY ("guessId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
