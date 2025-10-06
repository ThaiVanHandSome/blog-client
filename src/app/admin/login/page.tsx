"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, loginSchema } from "@/schemas";
import FormInput from "@/components/form/FormInput";
import { fetchApi } from "@/utils/fetchApi";
import { API_ENDPOINTS } from "@/constants/api";
import LoadingButton from "@/components/LoadingButton";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks";
import { DataResponse } from "@/types/http.type";

const DEFAULT_VALUES: LoginInput = {
  email: "",
  password: ""
};

export default function AdminLoginPage() {
  const { control, handleSubmit } = useForm<LoginInput>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(loginSchema)
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) =>
      fetchApi<DataResponse<{ accessToken: string; refreshToken: string }>>({
        url: API_ENDPOINTS.ADMIN.AUTH.LOGIN,
        method: "POST",
        body: data
      })
  });

  const setCookieForServerMutation = useMutation({
    mutationFn: (data: { accessToken: string; refreshToken: string }) =>
      fetchApi({
        url: "/api/set-cookies",
        method: "POST",
        body: data
      })
  });

  const { refetch } = useAuth();

  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    loginMutation.mutate(data, {
      onSuccess: async res => {
        await refetch();
        await setCookieForServerMutation.mutateAsync(res.data);
        router.push("/admin");
      }
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-card-foreground">
            Admin Login
          </h1>
          <p className="text-muted-foreground">
            Enter your information to login as admin
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="email"
            control={control}
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
          />

          <FormInput
            name="password"
            control={control}
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
          />

          <LoadingButton
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            isLoading={loginMutation.isPending}
            loadingText="Login..."
          >
            Login
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}
