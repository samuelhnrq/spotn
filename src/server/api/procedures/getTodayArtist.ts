import type { Entity } from "@prisma/client";
import { db } from "@/server/db";
import { DateTime } from "luxon";
import type { EntityWithProps } from "@/lib/models";

export async function getTodayArtist(): Promise<EntityWithProps> {
  const now = DateTime.now();
  const today = await db.dailyEntity.findFirst({
    where: {
      day: now.startOf("day").toJSDate(),
    },
    orderBy: {
      day: "desc",
    },
    include: { entity: { include: { props: { include: { prop: true } } } } },
  });
  if (today) {
    console.log("already picked today", today.entity.name);
    return today.entity;
  }
  let randomArtist: Entity | null = null;
  while (!randomArtist) {
    const [nextArtist] = await db.$queryRaw<Entity[]>`
      SELECT * from "Entity" TABLESAMPLE BERNOULLI(10) limit 1;
    `;
    if (nextArtist) {
      randomArtist = nextArtist;
    }
  }
  const newDaily = await db.dailyEntity.create({
    data: {
      day: now.startOf("day").toJSDate(),
      entityId: randomArtist.id,
    },
    include: {
      entity: {
        include: {
          props: {
            include: {
              prop: true,
            },
          },
        },
      },
    },
  });
  return newDaily.entity;
}
