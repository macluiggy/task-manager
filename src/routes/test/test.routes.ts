import Elysia from "elysia";
import TestController from "../../controllers/test/test.controller";
const testController = new TestController();

const test = new Elysia({
  name: "test",
  prefix: "/test",
}).get("/", () => {
  return testController.test();
});

export default test;
