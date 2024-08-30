/*
  Warnings:

  - You are about to drop the `Entity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGuess` table. If the table is not empty, all the data it contains will be lost.
*/

ALTER TABLE "Entity" RENAME TO entity;
ALTER TABLE "UserGuess" RENAME TO user_guess;

INSERT INTO entity_prop (id, name, type) VALUES
    (1, 'Debut Year', 'CHRONOLOGICAL'),
    (2, 'Members', 'NUMERICAL'),
    (3, 'Popularity', 'NUMERICAL'),
    (4, 'Gender', 'CATEGORICAL'),
    (5, 'Genre', 'CATEGORICAL'),
    (6, 'Country', 'GEOGRAPHICAL');
