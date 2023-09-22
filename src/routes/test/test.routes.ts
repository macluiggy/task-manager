import Elysia, { Context, t } from "elysia";
import TestController from "../../controllers/test/test.controller";
import { globalDecorate } from "../../constants/config/config.constant";
import { testSchema } from "../../schemas/test/test.schema";
const testController = new TestController();

const isSignIn = (context: Context) => {
  // return headers.get("Authorization") || headers.get("authorization");
  const {
    set,
    request: { headers },
  } = context;
  const authorization =
    headers.get("Authorization") || headers.get("authorization");
  if (!authorization) {
    set.status = 401;
    return "Unauthorized";
  }
};

const test = new Elysia({
  name: "test",
  prefix: "/test",
})
  .guard({
    response: t.String(),
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
      authorization:
        headers.get("Authorization") ||
        headers.get("authorization") ||
        "No Authorization",
    };
  })
  .get("/version", ({ authorization }) => {
    return `Authorization: ${authorization}`;
  })
  // https://elysiajs.com/concept/life-cycle.html
  .get("/life-cycle", () => "hello", {
    // beforeHandle: (context) => {
    //   const {
    //     set,
    //     request: { headers },
    //   } = context;
    //   if (!isSignIn(headers)) {
    //     set.status = 401;
    //     return "Unauthorized";
    //   }
    // },
    beforeHandle: [isSignIn],
  })
  // https://elysiajs.com/concept/schema.html
  .model({
    sign: testSchema
  })
  .post(
    "/schema",
    (context) => {
      return context.body;
    },
    {
      body: 'sign',
      response: 'sign'
      // beforeHandle: [isSignIn],
    }
  )
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
