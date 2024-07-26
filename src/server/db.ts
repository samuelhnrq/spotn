import { PrismaClient } from "@prisma/client";

// import { env } from "@/env";
// const { env } = process;
const isProd = process.env.NODE_ENV !== "production";

const createPrismaClient = () =>
  new PrismaClient({
    log: isProd ? ["error"] : ["query", "error", "warn"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (!isProd) globalForPrisma.prisma = db;
