import { Context, Elysia, t } from "elysia";
import testRoutes from "./routes/test/test.routes";
import { ENV_VARIABLES } from "./env-variables";
import { globalDecorate } from "./constants/config/config.constant";
import taskRoutes from "./routes/task/task.routes";
import prismaMain from "../prisma/script";


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

await prismaMain();

/**
 * set:  {
    headers: {
        [header: string]: string;
    } & {
        "Set-Cookie"?: string | string[] | undefined;
    };
    status?: number | undefined;
    redirect?: string | undefined;
}

request: Request

error: Readonly<Error> | Readonly<ValidationError> | Readonly<NotFoundError> | Readonly<ParseError> | Readonly<...>

code: "UNKNOWN" | "VALIDATION" | "NOT_FOUND" | "PARSE" | "INTERNAL_SERVER_ERROR"
 */

type ErrorObject = {
  code:
    | "UNKNOWN"
    | "VALIDATION"
    | "NOT_FOUND"
    | "PARSE"
    | "INTERNAL_SERVER_ERROR"
    | string;
  error: Error & {
    isBoom?: boolean;
    output?: {
      statusCode: number;
      payload: {
        statusCode: number;
        error: string;
        message: string;
      };
      headers: {
        [header: string]: string;
      };
    };
  };
  request: Request;
  set: {
    headers: {
      [header: string]: string;
    } & {
      "Set-Cookie"?: string | string[] | undefined;
    };
    status?: number | undefined;
    redirect?: string | undefined;
  };
};
app
  .onError((errorObject: ErrorObject) => {
    let { code, error, request, set } = errorObject;
    const { message, name, stack, cause } = error;
    console.error(error.stack);

    const status =
      {
        UNKNOWN: 500,
        VALIDATION: 400,
        NOT_FOUND: 404,
        PARSE: 400,
        INTERNAL_SERVER_ERROR: 500,
        P2025: 404,
      }[code] || 500;

    set.status = status;
    if (error.isBoom) {
      set.status = error.output?.statusCode || 500;
      code = error.output?.payload.error || "UNKNOWN";
    }
    return {
      code,
      message,
      name,
      stack,
      cause,
    };
  })
  // .onBeforeHandle(isSignIn)
  // .group("/api/v1", (app) => app)
  // .guard({
  //   response: t.String(),
  // })
  .state("version", 1)
  .decorate(globalDecorate)
  .get("/", () => {
    return "Hello Elysia";
  })
  .use(testRoutes)
  .use(taskRoutes)
  .listen(ENV_VARIABLES.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default app;
