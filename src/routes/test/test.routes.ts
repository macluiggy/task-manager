import Elysia, { Context } from "elysia";
import TestController from "../../controllers/test/test.controller";
import { globalDecorate } from "../../constants/config/config.constant";
const testController = new TestController();

const test = new Elysia({
  name: "test",
  prefix: "/test",
})
  // handler: https://elysiajs.com/concept/handler.html
  .get("/response", () => {
    return {
      vtuber: ["Shirakami Fubuki", "Inugami Korone"],
    };
  })
  // https://elysiajs.com/concept/state-decorate.html
  .decorate(globalDecorate)
  .state("version", 1 as number | null)
  .get("state-and-decorate", ({ store: { version }, getDate }) => {
    return `version: ${version} ${getDate()}`;
  })
  // https://elysiajs.com/concept/state-decorate.html
  .derive(({ request: { headers }, store, getDate }) => {
    return {
      authorization: headers.get("Authorization") || headers.get("authorization") || "No Authorization",
    };
  })
  .get("/version", ({ authorization }) => {
    return `Authorization: ${authorization}`;
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
