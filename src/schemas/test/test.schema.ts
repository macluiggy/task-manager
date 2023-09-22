import { t } from "elysia";

const testSchema =  t.Object({
  username: t.String({
    pattern: "bar",
    default: "bar",
  }),
  password: t.String({
    pattern: "bar",
    default: "bar",
  }),
})

export {
  testSchema
}