import { z } from "zod";

export const UpdateAccountSchema = z.object({
  id: z.number(),
  name: z.string(),
  currency: z.string(),
  description: z.string(),
  type: z.string(),
  balance: z.number(),
});

export type UpdateAccountInput = z.infer<typeof UpdateAccountSchema>;
