import { Elysia } from "elysia";
import plugin from "./routes/test/test.routes";
import { ENV_VARIABLES } from "./env-variables";

const app = new Elysia({
  name: "Elysia",
  prefix: "/v1",
})
  .get("/", () => {
    return "Hello Elysia";
  })
  .use(plugin)
  .listen(ENV_VARIABLES.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default app;
