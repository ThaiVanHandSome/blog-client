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
    repeatPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Passwords do not match",
  });

export const registerSchema = authSchema.pick({
  name: true,
  email: true,
  password: true,
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = authSchema.pick({
  email: true,
  password: true,
});
export type LoginInput = z.infer<typeof loginSchema>;

export const resetPasswordSchema = authSchema.pick({
  newPassword: true,
  repeatPassword: true,
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const blogSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must be less than 100 characters")
    .trim(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(300, "Description must be less than 300 characters")
    .trim(),
  topic: z
    .string()
    .min(2, "Topic must be at least 2 characters")
    .max(50, "Topic must be less than 50 characters")
    .trim(),
  thumbnail: z.string().min(1, "Please select an image").trim(),
  content: z.string().min(50, "Content must be at least 50 characters").trim(),
});
export type BLogInput = z.infer<typeof blogSchema>;
