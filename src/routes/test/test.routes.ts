import Elysia from "elysia";
import TestController from "../../controllers/test/test.controller";
const testController = new TestController();

const test = new Elysia({
  name: "test",
  prefix: "/test",
})
  .get("/", async (context) => {
    return await testController.test();
  })
  .get("/id/:id", (context) => {
    console.log(context);
    // return "test id";
    return {
      id: context.params.id,
    };
    // return testController.testId(context.params.id);
  });

export default test;
