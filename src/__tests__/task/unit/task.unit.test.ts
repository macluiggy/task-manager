import { describe, expect, it, mock, beforeEach, jest } from "bun:test";
import TaskController from "../../../controllers/task/task.controller";
import { PrismaClient } from "@prisma/client";
import boom from "@hapi/boom";
import requestApp from "../../requestApp";

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

     const res = await requestApp.get("/api/v1/task")
     console.log(res.body);
     
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
      try {
        console.log("Start of test");

        await controller.findById(999);

        console.log("After findById");
      } catch (err: any) {
        expect(err.message).toBe("Task not found");
      }
    });

    // ... Similarly, write tests for update, delete, etc.
  });
});
