"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormError from "@/components/FormError";
import { registerAction } from "@/actions/auth.action";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [state, dispatch] = useActionState(registerAction, {
    message: null,
    errors: undefined
  });

  const message = state?.message;
  useEffect(() => {
    if (message) toast.error(message);
  }, [message]);

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

        <form action={dispatch} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-card-foreground"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full"
              aria-describedby="name-error"
              autoComplete="name"
            />
            <FormError id="name-error" error={state?.errors?.name?.[0]} />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-card-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full"
              aria-describedby="email-error"
              autoComplete="email"
            />
            <FormError id="email-error" error={state?.errors?.email?.[0]} />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-card-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full"
              aria-describedby="password-error"
              autoComplete="new-password"
            />
            <FormError
              id="password-error"
              error={state?.errors?.password?.[0]}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
