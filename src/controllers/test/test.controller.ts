import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class TestController {
  constructor() {}

  async find() {
    return {
      message: "hello from test",
      data: await prisma.test.findMany(),
    };
  }

  async create(data: any) {
    return {
      message: "hello from test",
      data: await prisma.test.create({
        data: data,
      }),
    };
  }

  async findById(id: number) {
    return {
      message: "hello from test",
      data: await prisma.test.findUnique({
        where: {
          id: id,
        },
      }),
    };
  }

  async update(id: number, data: any) {
    return {
      message: "hello from test",
      data: await prisma.test.update({
        where: {
          id: id,
        },
        data: data,
      }),
    };
  }

  async delete(id: number) {
    return {
      message: "hello from test",
      data: await prisma.test.delete({
        where: {
          id: id,
        },
      }),
    };
  }
}

export default TestController;
