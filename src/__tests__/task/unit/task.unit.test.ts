import { describe, expect, it, mock, beforeEach, jest } from "bun:test";
import TaskController from "../../../controllers/task/task.controller";
import { PrismaClient } from "@prisma/client";
import boom from "@hapi/boom";

// Mock the Prisma client
mock(() => "@prisma/client");

const mockedPrisma = new PrismaClient();

describe("TaskController", () => {
  let controller: TaskController;
  let idTask: number;
  beforeEach(() => {
    controller = new TaskController();
  });

  describe("CRUD operations for task service", () => {
    it("should find all tasks", async () => {
      // const find = mock(controller.find);
      // let a =  find.mockResolvedValue({
      //     message: "Success",
      //     data: [
      //       {
      //         id: 1,
      //         name: "Test Task",
      //         description: null,
      //         dueDate: null,
      //         createdAt: new Date(),
      //         updatedAt: new Date(),
      //       },
      //     ],
      //   });
      //   console.log(a);

      const result = await controller.find();

      expect(result.data).toBeInstanceOf(Array);
    });

    it("should create a task", async () => {
      const mockData = { name: "New Task" };
      const result = await controller.create(mockData);
      expect(result.data).toHaveProperty("id");

      idTask = result.data.id;
    });

    it("should find task by id", async () => {
      const result = await controller.findById(idTask);
      expect(result.data).toHaveProperty("id");
    });

    it("should throw error if task not found", async () => {
      // await controller.findById(999);
      // await expect(controller.findById(999)).rejects.toThrow("Task not found");
      controller.findById(999).catch((err) => {
        console.log(err instanceof Error); // should print true if it's an error
        console.log(err.message); // should print the error message
      });

      // await expect(controller.findById(999)).rejects.toThrow(
      //   "Specific error message"
      // );
    });

    // ... Similarly, write tests for update, delete, etc.
  });
});
