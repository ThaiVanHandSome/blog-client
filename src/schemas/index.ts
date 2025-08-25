import * as z from "zod";

const authSchema = z
  .object({
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
    password: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    repeatPassword: z.string().min(6, "Password must be at least 6 characters")
  })
  .refine(data => data.newPassword === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Passwords do not match"
  });

export const registerSchema = authSchema.pick({
  name: true,
  email: true,
  password: true
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = authSchema.pick({
  email: true,
  password: true
});
export type LoginInput = z.infer<typeof loginSchema>;

export const resetPasswordSchema = authSchema.pick({
  newPassword: true,
  repeatPassword: true
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const blogSchema = z.object({
  title: z
    .string()
    .min(10, "Name must be at least 10 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  content: z.string().nonempty().trim().toLowerCase()
});
export type BLogInput = z.infer<typeof blogSchema>;
