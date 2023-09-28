import { PrismaClient } from "@prisma/client";
import boom from "@hapi/boom";

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
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });

    if (!task) {
      throw boom.notFound("Task not found");
    }
    return {
      message: "hello from task",
      data: task,
    };
  }

  async update(id: number, data: any) {
    await this.findById(id);
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: data,
    });

    return {
      message: "hello from task",
      data: task,
    };
  }

  async delete(id: number) {
    await this.findById(id);
    const task = await prisma.task.delete({
      where: {
        id: id,
      },
    });
    return {
      message: "hello from task",
      data: task,
    };
  }
}

export default TaskController;
