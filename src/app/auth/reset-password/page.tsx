"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordInput, resetPasswordSchema } from "@/schemas";
import FormInput from "@/components/form/FormInput";
import { fetchApi } from "@/utils/fetchApi";
import { API_ENDPOINTS } from "@/constants/api";
import LoadingButton from "@/components/LoadingButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const DEFAULT_VALUES: ResetPasswordInput = {
  newPassword: "",
  repeatPassword: ""
};

interface ResetPasswordRequest {
  new_password: string;
  token: string;
}

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { control, handleSubmit } = useForm<ResetPasswordInput>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(resetPasswordSchema)
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (body: ResetPasswordRequest) =>
      fetchApi({
        url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
        method: "POST",
        body
      })
  });

  const router = useRouter();

  const onSubmit = async (data: ResetPasswordInput) => {
    const body: ResetPasswordRequest = {
      new_password: data.newPassword,
      token
    };
    resetPasswordMutation.mutate(body, {
      onSuccess: () => {
        router.push("/auth/login");
      }
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-card-foreground">
            Reset Password
          </h1>
          <p className="text-muted-foreground">Enter your new password</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="newPassword"
            control={control}
            label="New Password"
            type="password"
            placeholder="Enter your new password"
          />

          <FormInput
            name="repeatPassword"
            control={control}
            label="Repeat Password"
            type="password"
            placeholder="Repeat your password"
          />

          <LoadingButton
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            isLoading={resetPasswordMutation.isLoading}
            loadingText="Reset..."
          >
            Reset
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}
