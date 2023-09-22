import Elysia from "elysia";
import TaskController from "../../controllers/task/task.controller";
import { crateTaskSchema } from "../../schemas/task/task.schema";

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
        const data = context.body
        return taskController.create(data);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    {
      body: crateTaskSchema,
    }
  );

export default taskRoutes;
