import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().endsWith("@gmail.com"),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters" }),
});

export const signupSchema = loginSchema.extend({
  first_name: z
    .string()
    .min(1, { message: "First name must be at least 1 character" }),
  last_name: z
    .string()
    .min(1, { message: "Last name must be at least 1 character" }),
});

export type LoginSchemaData = z.infer<typeof loginSchema>;
export type SignupSchemaData = z.infer<typeof signupSchema>;
