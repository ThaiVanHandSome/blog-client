"use server";

import { registerSchema } from "@/schemas";
import { AuthService } from "@/services/auth.service";

export interface FormState {
  message: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
}

export async function registerAction(prevState: FormState, formData: FormData) {
  const formState = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  };

  const validatedFields = registerSchema.safeParse(formState);

  if (!validatedFields.success) {
    return {
      message: "Invalid form data",
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const response = await AuthService.register(formState);
}
