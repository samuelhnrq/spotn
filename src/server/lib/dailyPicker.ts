import type { EntityWithProps } from "@/lib/models";
import { db } from "@/server/db";
import type { DailyEntity, Entity } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { DateTime } from "luxon";

export const INCLUDE_ENTITY_WITH_PROPS = {
  entity: { include: { props: { include: { prop: true } } } },
};

export interface DayWithProps extends DailyEntity {
  entity: EntityWithProps;
}

export async function getTodayArtist(): Promise<DayWithProps> {
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
    return today;
  }
  const totalEntities = await db.entity.count();
  if (totalEntities === 0) {
    console.error("Database is empty");
    throw new TRPCError({ code: "NOT_FOUND" });
  }
  console.log("No artist for today, running dice");
  let randomArtist: Entity | null = null;
  while (!randomArtist) {
    const [nextArtist] = await db.$queryRaw<Entity[]>`
      SELECT * from entity TABLESAMPLE BERNOULLI(10) limit 1;
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
  return newDaily;
}
