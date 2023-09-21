import { Elysia } from "elysia";
import testRoutes from "./routes/test/test.routes";
import { ENV_VARIABLES } from "./env-variables";

const app = new Elysia({
  name: "Elysia",
  prefix: "/api/v1",
})
  .get("/", () => {
    return "Hello Elysia";
  })
  .use(testRoutes)
  .listen(ENV_VARIABLES.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default app;
