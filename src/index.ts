import { Elysia } from "elysia";
import plugin from "./routes/test/test.routes";

const app = new Elysia({
  name: "Elysia",
  prefix: "/v1",
})
  .get("/", () => "Hello Elysia")
  .use(plugin)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default app;
