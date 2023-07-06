import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// TODO: Figure out how to fix the type errors 
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  //@ts-ignore
  if (!global.prisma) {
    //@ts-ignore
    global.prisma = new PrismaClient();
  }
  //@ts-ignore
  prisma = global.prisma;
}

export { prisma };
