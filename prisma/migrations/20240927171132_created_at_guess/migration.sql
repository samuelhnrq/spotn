-- DropIndex
DROP INDEX "UserGuess_userId_idx";

-- AlterTable
ALTER TABLE "entity" RENAME CONSTRAINT "Entity_pkey" TO "entity_pkey";

-- AlterTable
ALTER TABLE "user_guess" RENAME CONSTRAINT "UserGuess_pkey" TO "user_guess_pkey";
alter table "user_guess" ADD COLUMN  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "user_guess_dayId_userId_idx" ON "user_guess"("dayId", "userId");

-- RenameForeignKey
ALTER TABLE "entity" RENAME CONSTRAINT "Entity_kind_id_fkey" TO "entity_kind_id_fkey";

-- RenameForeignKey
ALTER TABLE "user_guess" RENAME CONSTRAINT "UserGuess_dayId_fkey" TO "user_guess_dayId_fkey";

-- RenameForeignKey
ALTER TABLE "user_guess" RENAME CONSTRAINT "UserGuess_guessId_fkey" TO "user_guess_guessId_fkey";

-- RenameIndex
ALTER INDEX "UserGuess_userId_guessId_dayId_key" RENAME TO "user_guess_userId_guessId_dayId_key";
