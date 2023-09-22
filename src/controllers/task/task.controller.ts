import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TaskController {
  constructor() {}

  async find() {
    return {
      message: "hello from task",
      data: await prisma.task.findMany(),
    };
  }

  async create(data: any) {
    const create = prisma.task.create({
      data: data,
    });
    const [created] = await prisma.$transaction([create]);
    return {
      message: "hello from task",
      data: created,
    };
  }

  async findById(id: number) {
    return {
      message: "hello from task",
      data: await prisma.task.findUnique({
        where: {
          id: id,
        },
      }),
    };
  }

  async update(id: number, data: any) {
    return {
      message: "hello from task",
      data: await prisma.task.update({
        where: {
          id: id,
        },
        data: data,
      }),
    };
  }

  async delete(id: number) {
    return {
      message: "hello from task",
      data: await prisma.task.delete({
        where: {
          id: id,
        },
      }),
    };
  }
}

export default TaskController;
