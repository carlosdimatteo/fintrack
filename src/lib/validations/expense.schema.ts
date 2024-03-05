import { z } from "zod";

export const CreateExpenseSchema = z.object({
  category: z.number(),
  amount: z.number(),
  currency: z.string(),
  description: z.string(),
  method: z.string(),
});

export type CreateExpenseInput = z.infer<typeof CreateExpenseSchema>;
