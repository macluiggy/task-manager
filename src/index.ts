import { Elysia } from "elysia";
import testRoutes from "./routes/test/test.routes";
import { ENV_VARIABLES } from "./env-variables";
import { globalDecorate } from "./constants/config/config.constant";

const app = new Elysia({
  name: "Elysia",
  prefix: "/api/v1",
  seed: {
    version: 1,
  },
});

app
  // .group("/api/v1", (app) => app)
  .state("version", 1)
  .decorate(globalDecorate)
  .get("/", () => {
    return "Hello Elysia";
  })
  .use(testRoutes)
  .listen(ENV_VARIABLES.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default app;
