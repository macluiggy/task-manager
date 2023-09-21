import Elysia from "elysia";
import TestController from "../../controllers/test/test.controller";
const testController = new TestController();

const test = new Elysia({
  name: "test",
  prefix: "/test",
})
  .get("/", async (context) => {
    try {
      return await testController.find();
    } catch (error) {
      console.log(error);
      return error;
    }
  })
  .post("/", (context) => {
    try {
      return testController.create(context.body);
    } catch (error) {
      console.log(error);
      return error;
    }
  })
  .get("/:id", (context) => {
    try {
      return testController.findById(+context.params.id);
    } catch (error) {
      console.log(error);
      return error;
    }
  })
  .patch("/:id", (context) => {
    try {
      return testController.update(+context.params.id, context.body);
    } catch (error) {
      console.log(error);
      return error;
    }
  })
  .delete("/:id", (context) => {
    try {
      return testController.delete(+context.params.id);
    } catch (error) {
      console.log(error);
      return error;
    }
  });

export default test;
