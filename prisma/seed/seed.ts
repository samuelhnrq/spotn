import { EntityPropType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const kind = await prisma.entityKind.create({
    data: {
      name: "Artist",
      props: {
        create: [
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
      name: "Pink Floyd",
      kind: { connect: { id: kind.id } },
      props: {
        create: [
          { propId: propMap.year, value: "1967" },
          { value: "2", propId: propMap.members },
          { value: "3", propId: propMap.rank },
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
}

main()
  .catch(async (e) => {
    console.error("Error seeding database", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
