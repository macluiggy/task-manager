import { t } from "elysia";

const taskBody = {
  name: t.String(),
  description: t.String(),
  dueDate: t.String(),
};
const crateTaskSchema = t.Object(taskBody);
const updateTaskSchema = t.Object(taskBody);

export { crateTaskSchema, updateTaskSchema };
