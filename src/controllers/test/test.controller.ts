import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class TestController {
  constructor() {}

  async test() {
    // return "hello from test";
    return {
      message: "hello from test",
      data: await prisma.test.findMany()
    }
  }
}

export default TestController;
