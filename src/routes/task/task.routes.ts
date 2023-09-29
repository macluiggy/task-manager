import Elysia from "elysia";
import TaskController from "../../controllers/task/task.controller";
import { crateTaskSchema } from "../../schemas/task/task.schema";
import { verifyTaskIsDone } from "../../middlewares/task/task.middleware";

const taskController = new TaskController();

const taskRoutes = new Elysia({
  name: "task",
  prefix: "/task",
});

taskRoutes
  .get("/", () => {
    try {
    } catch (error) {}
  })
  .post(
    "/",
    (context) => {
      try {
        const data = context.body;
        return taskController.create(data);
      } catch (error) {
        throw error;
      }
    },
    {
      body: crateTaskSchema,
    }
  )
  .get("/:id", (context) => {
    try {
      const id = +context.params.id;
      return taskController.findById(id);
    } catch (error) {
      throw error;
    }
  })
  .patch("/:id", (context) => {
    try {
      const id = +context.params.id;
      const data = context.body;
      return taskController.update(id, data);
    } catch (error) {
      throw error;
    }
  })
  .delete("/:id", (context) => {
    try {
      const id = +context.params.id;
      return taskController.delete(id);
    } catch (error) {
      throw error;
    }
  });

export default taskRoutes;
