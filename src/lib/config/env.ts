import z from "zod";

const envSchema = z.object({
  API_ENDPOINT: z.string(),
});

export const ENV = envSchema.parse(process.env);
