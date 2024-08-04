/**
 * ! Executing this script will delete all data in your database and seed it with 10 artist.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { Gender } from "@prisma/client";
import { createSeedClient } from "@snaplet/seed";

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed the database with 10 artist
  await seed.artist([
    {
      artistGid: "83d91898-7763-47d7-b03b-b92132375c47",
      name: "Pink Floyd",
      debutYear: 1967,
      members: 2,
      rank: 3,
      gender: Gender.Male,
      genre: "progressive rock",
      country: "United Kingdom",
    },
    {
      artistGid: "a74b1b7f-71a5-4011-9441-d0b5e4122711",
      name: "Radiohead",
      debutYear: 1993,
      members: 5,
      rank: 1,
      gender: Gender.Male,
      genre: "alternative rock",
      country: "United Kingdom",
    },
    {
      artistGid: "c89ea689-c053-4d97-bada-8b81a6236f58",
      name: "Chromatics",
      debutYear: 2003,
      members: 3,
      rank: 1000,
      gender: Gender.Mixed,
      genre: "electronic",
      country: "United States",
    },
    {
      artistGid: "5ffb73c0-b739-4231-ba22-f8d361be1d45",
      name: "Yoko Kanno",
      debutYear: 1993,
      members: 1,
      rank: 999,
      gender: Gender.Female,
      genre: "jazz",
      country: "Japan",
    },
    {
      artistGid: "2819834e-4e08-47b0-a2c4-b7672318e8f0",
      name: "The Byrds",
      debutYear: 1965,
      members: 3,
      rank: 998,
      gender: Gender.Male,
      genre: "folk rock",
      country: "United States",
    },
    {
      artistGid: "a56bd8f9-8ef8-4d63-89a4-794ed1360dd2",
      name: "Diplo",
      debutYear: 2002,
      members: 1,
      rank: 997,
      gender: Gender.Male,
      genre: "electronic",
      country: "United States",
    },
  ]);

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();
