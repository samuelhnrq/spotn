import type { EntityWithProps } from "@/lib/models";
import { db } from "@/server/db";
import type { Entity } from "@prisma/client";
import { DateTime } from "luxon";

const INCLUDE_ENTITY_WITH_PROPS = {
  entity: { include: { props: { include: { prop: true } } } },
};

export async function getTodayArtist(): Promise<EntityWithProps> {
  const day = DateTime.now().toUTC().startOf("day").toJSDate();
  const today = await db.dailyEntity.findFirst({
    where: {
      day,
    },
    orderBy: {
      day: "desc",
    },
    include: INCLUDE_ENTITY_WITH_PROPS,
  });
  if (today) {
    console.log("Already picked today", today.entity.name);
    return today.entity;
  }
  console.log("No artist for today, running dice");
  let randomArtist: Entity | null = null;
  while (!randomArtist) {
    const [nextArtist] = await db.$queryRaw<Entity[]>`
      SELECT * from "Entity" TABLESAMPLE BERNOULLI(10) limit 1;
    `; // Somehow bernoully is not guaranteed to select one
    if (nextArtist) {
      randomArtist = nextArtist;
    }
  }
  console.log("Picked", randomArtist.name);
  const newDaily = await db.dailyEntity.create({
    data: {
      day,
      entityId: randomArtist.id,
    },
    include: INCLUDE_ENTITY_WITH_PROPS,
  });
  return newDaily.entity;
}
