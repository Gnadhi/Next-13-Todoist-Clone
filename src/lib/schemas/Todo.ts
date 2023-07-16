import * as z from "zod";

export const TodoSchema = z.object({
  description: z.string(),
  isComplete: z.boolean(),
  dueDate: z.date(),
});
