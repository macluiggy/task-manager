import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class TestController {
  constructor() {}

  test() {
    // return "hello from test";
    return prisma.user.findMany();
  }
}

export default TestController;
