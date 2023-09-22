import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const globalDecorate = {
  getDate: () => new Date(),
  db: prisma,
};

const API_ENVIRONMENT = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
  TEST: "test",
};

export { globalDecorate, API_ENVIRONMENT };
