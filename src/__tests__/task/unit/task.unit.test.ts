import {
  describe,
  expect,
  it,
  mock,
  beforeEach,
  jest,
  beforeAll,
  afterAll,
} from "bun:test";
import TaskController from "../../../controllers/task/task.controller";
import { PrismaClient } from "@prisma/client";
import prismaMain from "../../../../prisma/script";
prismaMain();

// Mock the Prisma client
mock(() => "@prisma/client");

const mockedPrisma = new PrismaClient();

describe("TaskController", () => {
  let controller: TaskController;
  let idTask: number;
  beforeAll(() => {
    controller = new TaskController();
  });

  describe("CRUD operations for task service", () => {
    it("should find all tasks", async () => { 
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
      try {
        console.log("Start of test");

        await controller.findById(idTask + 1);

        console.log("After findById");
      } catch (err: any) {
        console.log("Inside catch");

        expect(err.message).toBe("Task not found");
      }
    });

    // ... Similarly, write tests for update, delete, etc.
    it("should update a task", async () => {
      const mockData = { name: "Updated Task" };
      const result = await controller.update(idTask, mockData);

      expect(result.data).toHaveProperty("id");
    });

    it("should delete a task", async () => {
      const result = await controller.delete(idTask);

      expect(result.data).toHaveProperty("id");
    });
  });
});
