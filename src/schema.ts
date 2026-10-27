import { z } from "zod";
export const TaskSchema = z.object({
 id: z.number(),
 title: z.string(),
 done: z.boolean(),
 dueDate: z.string().optional(),
});
export type Task = z.infer<typeof TaskSchema>;
import { z } from "zod";

export type Task = {
  id: number;
  title: string;
  done: boolean;
};

// Strand 2 - Step 2: Form doğrulama şeması
export const CreateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: z.string().optional(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
