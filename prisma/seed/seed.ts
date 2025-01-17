import { EntityPropType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const kind = await prisma.entityKind.create({
    data: {
      name: "Artist",
      props: {
        connect: [
          // These are created in prisma/migrations/20240830121750_renames_tables/migration.sql
          { id: 1, name: "Debut Year", type: EntityPropType.CHRONOLOGICAL },
          { id: 2, name: "Members", type: EntityPropType.NUMERICAL },
          { id: 3, name: "Popularity", type: EntityPropType.NUMERICAL },
          { id: 4, name: "Gender", type: EntityPropType.CATEGORICAL },
          { id: 5, name: "Genre", type: EntityPropType.CATEGORICAL },
          { id: 6, name: "Country", type: EntityPropType.GEOGRAPHICAL },
        ],
      },
    },
  });

  const propMap = {
    year: 1,
    members: 2,
    rank: 3,
    gender: 4,
    genre: 5,
    country: 6,
  };
  await prisma.entity.create({
    data: {
      name: "The Rolling Stones",
      kind: { connect: { id: kind.id } }, // Assuming 'kind' is already defined and relevant
      props: {
        create: [
          { propId: propMap.year, value: "1962" },
          { value: "4", propId: propMap.members }, // Current active members
          { value: "4", propId: propMap.rank },
          { value: "male", propId: propMap.gender },
          { value: "Rock", propId: propMap.genre },
          { value: "United Kingdom", propId: propMap.country },
        ],
      },
    },
  });

  await prisma.entity.create({
    data: {
      name: "Led Zeppelin",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "1968" },
          { value: "4", propId: propMap.members },
          { value: "2", propId: propMap.rank },
          { value: "male", propId: propMap.gender },
          { value: "Rock", propId: propMap.genre },
          { value: "United Kingdom", propId: propMap.country },
        ],
      },
    },
  });

  await prisma.entity.create({
    data: {
      name: "AC/DC",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "1973" },
          { value: "5", propId: propMap.members },
          { value: "12", propId: propMap.rank },
          { value: "male", propId: propMap.gender },
          { value: "Rock", propId: propMap.genre },
          { value: "Australia", propId: propMap.country },
        ],
      },
    },
  });

  await prisma.entity.create({
    data: {
      name: "Pink Floyd",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "1965" },
          { value: "4", propId: propMap.members }, // Classic lineup
          { value: "5", propId: propMap.rank },
          { value: "male", propId: propMap.gender },
          { value: "Rock", propId: propMap.genre },
          { value: "United Kingdom", propId: propMap.country },
        ],
      },
    },
  });

  await prisma.entity.create({
    data: {
      name: "The Who",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "1964" },
          { value: "2", propId: propMap.members }, // Current active members
          { value: "29", propId: propMap.rank },
          { value: "male", propId: propMap.gender },
          { value: "Rock", propId: propMap.genre },
          { value: "United Kingdom", propId: propMap.country },
        ],
      },
    },
  });
  await prisma.entity.create({
    data: {
      name: "Radiohead",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "1993" },
          { value: "5", propId: propMap.members },
          { value: "1", propId: propMap.rank },
          { value: "male", propId: propMap.gender },
          { value: "Rock", propId: propMap.genre },
          { value: "United Kingdom", propId: propMap.country },
        ],
      },
    },
  });
  await prisma.entity.create({
    data: {
      name: "Lady Gaga",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "2006" },
          { value: "1", propId: propMap.members },
          { value: "2", propId: propMap.rank },
          { value: "female", propId: propMap.gender },
          { value: "Pop", propId: propMap.genre },
          { value: "United States", propId: propMap.country },
        ],
      },
    },
  });

  await prisma.entity.create({
    data: {
      name: "Queen",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "1987" },
          { value: "5", propId: propMap.members },
          { value: "7", propId: propMap.rank },
          { value: "male", propId: propMap.gender },
          { value: "Rock", propId: propMap.genre },
          { value: "United Kingdom", propId: propMap.country },
        ],
      },
    },
  });
  await prisma.entity.create({
    data: {
      name: "Michael Jackson",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "1958" }, // Debut year with the Jackson 5
          { value: "1", propId: propMap.members },
          { value: "1", propId: propMap.rank }, // Arguably the most influential pop artist
          { value: "male", propId: propMap.gender },
          { value: "Pop", propId: propMap.genre },
          { value: "United States", propId: propMap.country },
        ],
      },
    },
  });

  await prisma.entity.create({
    data: {
      name: "Madonna",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "1979" },
          { value: "1", propId: propMap.members },
          { value: "2", propId: propMap.rank }, // Queen of Pop
          { value: "female", propId: propMap.gender },
          { value: "Pop", propId: propMap.genre },
          { value: "United States", propId: propMap.country },
        ],
      },
    },
  });

  await prisma.entity.create({
    data: {
      name: "Beyoncé",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "1997" }, // Debut with Destiny's Child
          { value: "1", propId: propMap.members },
          { value: "3", propId: propMap.rank },
          { value: "female", propId: propMap.gender },
          { value: "Pop", propId: propMap.genre },
          { value: "United States", propId: propMap.country },
        ],
      },
    },
  });

  await prisma.entity.create({
    data: {
      name: "Taylor Swift",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "2006" },
          { value: "1", propId: propMap.members },
          { value: "6", propId: propMap.rank },
          { value: "female", propId: propMap.gender },
          { value: "Pop", propId: propMap.genre },
          { value: "United States", propId: propMap.country },
        ],
      },
    },
  });

  await prisma.entity.create({
    data: {
      name: "Justin Bieber",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "2009" },
          { value: "1", propId: propMap.members },
          { value: "10", propId: propMap.rank },
          { value: "male", propId: propMap.gender },
          { value: "Pop", propId: propMap.genre },
          { value: "Canada", propId: propMap.country },
        ],
      },
    },
  });
}

main()
  .catch(async (e) => {
    console.error("Error seeding database", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
