import { Context, Elysia, t } from "elysia";
import testRoutes from "./routes/test/test.routes";
import { ENV_VARIABLES } from "./env-variables";
import { globalDecorate } from "./constants/config/config.constant";

// const isSignIn = (context: Context) => {
//   // return headers.get("Authorization") || headers.get("authorization");
//   const {
//     set,
//     request: { headers },
//   } = context;
//   const authorization =
//     headers.get("Authorization") || headers.get("authorization");
//   if (!authorization) {
//     set.status = 401;
//     return "Unauthorized";
//   }
// };
const app = new Elysia({
  name: "Elysia",
  prefix: "/api/v1",
  seed: {
    version: 1,
  },
});

app
  // .onBeforeHandle(isSignIn)
  // .group("/api/v1", (app) => app)
  .guard({
    response: t.String()
  })
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
