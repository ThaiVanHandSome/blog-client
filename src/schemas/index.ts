import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export type RegisterInput = z.infer<typeof registerSchema>;
