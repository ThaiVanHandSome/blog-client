/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput, registerSchema } from "@/schemas";
import FormInput from "@/components/form/FormInput";
import { fetchApi } from "@/utils/fetchApi";
import { API_ENDPOINTS } from "@/constants/api";
import LoadingButton from "@/components/LoadingButton";
import VerifyTokenDialog from "@/components/VerifyTokenDialog";
import { verifyTokenDialogAtom } from "@/atom";
import { TOKEN_TYPE_ENUM } from "@/components/VerifyTokenDialog/VerifyTokenDialog";
import { useAtom } from "jotai";
import Action from "@/components/form/Action";
import { useMutation } from "@tanstack/react-query";

const DEFAULT_VALUES: RegisterInput = {
  name: "",
  email: "",
  password: ""
};

export default function RegisterPage() {
  const { control, handleSubmit } = useForm<RegisterInput>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(registerSchema)
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterInput) =>
      fetchApi({
        url: API_ENDPOINTS.AUTH.REGISTER,
        method: "POST",
        body: data
      })
  });

  const [_, setIsOpen] = useAtom(verifyTokenDialogAtom);

  const onSubmit = async (data: RegisterInput) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        setIsOpen(true);
      }
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-card-foreground">
            Create an Account
          </h1>
          <p className="text-muted-foreground">
            Enter your information to register
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="name"
            control={control}
            label="Name"
            placeholder="Enter your name"
            autoComplete="name"
          />

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

          <Action useIn="register" />

          <LoadingButton
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            isLoading={registerMutation.isPending}
            loadingText="Registering..."
          >
            Register
          </LoadingButton>
        </form>
      </div>
      <VerifyTokenDialog type={TOKEN_TYPE_ENUM.REGISTRATION} />
    </div>
  );
}
