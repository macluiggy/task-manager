import { describe, expect, it, mock, beforeEach, jest } from "bun:test";
import TaskController from "../../../controllers/task/task.controller";
import { PrismaClient } from "@prisma/client";
import boom from "@hapi/boom";


// Mock the Prisma client
mock(() => '@prisma/client');

const mockedPrisma = new PrismaClient();

describe("TaskController", () => {
  let controller: TaskController;

  beforeEach(() => {
    controller = new TaskController();
    // jest.clearAllMocks(); // Clear any previous mocks
  });

  it("should find all tasks", async () => {
    // mockedPrisma.task.findMany.mockResolvedValue([
    //   { id: 1, name: "Test Task" },
    // ]);
    const find = mock(controller.find)
    console.log(find);
    
    const result = await controller.find();
    expect(result.data).toBeInstanceOf(Array);
  });

  // it("should create a task", async () => {
  //   const mockData = { name: "New Task" };
  //   mockedPrisma.task.create.mockResolvedValue({ id: 2, name: "New Task" });
  //   const result = await controller.create(mockData);
  //   expect(result.data).toEqual({ id: 2, name: "New Task" });
  // });

  // it("should find task by id", async () => {
  //   mockedPrisma.task.findUnique.mockResolvedValue({
  //     id: 1,
  //     name: "Test Task",
  //   });
  //   const result = await controller.findById(1);
  //   expect(result.data).toEqual({ id: 1, name: "Test Task" });
  // });

  // it("should throw error if task not found", async () => {
  //   mockedPrisma.task.findUnique.mockResolvedValue(null);
  //   await expect(controller.findById(999)).rejects.toThrow(boom.notFound());
  // });

  // ... Similarly, write tests for update, delete, etc.
});
