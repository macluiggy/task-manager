import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function prismaMain() {
  // connect to database
  prisma.$extends({
    query: {
      $allModels: {
        async findMany({ model, operation, args, query }) {
          args = { take: 10, ...args };

          return query;
        },
      },
      task: {
        async $allOperations({ model, operation, args, query }) {
          // convert due date from string to date if it is string
        },
      },
    },
  });
}

export default prismaMain;
