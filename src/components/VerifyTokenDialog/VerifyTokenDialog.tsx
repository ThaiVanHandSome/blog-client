/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useCallback, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { verifyTokenDialogAtom } from "@/atom";
import { fetchApi } from "@/utils/fetchApi";
import { API_ENDPOINTS } from "@/constants/api";
import LoadingButton from "../LoadingButton";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export enum TOKEN_TYPE_ENUM {
  FORGOT_PASSWORD = "forgot-password",
  REGISTRATION = "registration"
}

interface VerifyTokenProps {
  type: TOKEN_TYPE_ENUM;
}

interface FormDataType {
  token: string;
}

const DEFAULT_VALUES: FormDataType = {
  token: ""
};

export default function VerifyTokenDialog({ type }: VerifyTokenProps) {
  const { register, handleSubmit } = useForm<FormDataType>({
    defaultValues: DEFAULT_VALUES
  });

  const router = useRouter();

  const [isOpen, setIsOpen] = useAtom(verifyTokenDialogAtom);

  const verifyRegistrationMutation = useMutation({
    mutationFn: (body: { token: string }) =>
      fetchApi({
        url: API_ENDPOINTS.AUTH.VERIFY_REGISTRATION,
        method: "POST",
        body
      })
  });

  const verifyForgotPasswordMutation = useMutation({
    mutationFn: (body: { token: string }) =>
      fetchApi({
        url: API_ENDPOINTS.AUTH.VERIFY_FORGOT_PASSWORD_TOKEN,
        method: "POST",
        body
      })
  });

  const verifyTokenFunc = useCallback(
    async (tokenType: TOKEN_TYPE_ENUM, data: FormDataType) => {
      const body = {
        token: data.token
      };
      switch (tokenType) {
        case TOKEN_TYPE_ENUM.FORGOT_PASSWORD:
          return verifyForgotPasswordMutation.mutate(body, {
            onSuccess: () => {
              setIsOpen(false);
              router.push(`/auth/reset-password?token=${data.token}`);
            }
          });

        case TOKEN_TYPE_ENUM.REGISTRATION:
          return verifyRegistrationMutation.mutate(body, {
            onSuccess: () => {
              setIsOpen(false);
              router.push("/auth/login");
            }
          });

        default:
          return "Verify Registration";
      }
    },
    [router]
  );

  const isLoading =
    verifyRegistrationMutation.isPending ||
    verifyForgotPasswordMutation.isPending;

  const onSubmit = handleSubmit(async (data: FormDataType) => {
    await verifyTokenFunc(type, data);
  });

  const getDialogTitle = useCallback((tokenType: TOKEN_TYPE_ENUM) => {
    switch (tokenType) {
      case TOKEN_TYPE_ENUM.FORGOT_PASSWORD:
        return "Verify Token";

      case TOKEN_TYPE_ENUM.REGISTRATION:
        return "Verify Registration";

      default:
        return "Verify Registration";
    }
  }, []);

  const dialogTitle = useMemo(() => {
    return getDialogTitle(type);
  }, [getDialogTitle, type]);

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <Input
            required
            {...register("token")}
            placeholder="Token..."
            className="mb-2"
          />
          <LoadingButton
            isLoading={isLoading}
            loadingText="Verify..."
            className="float-right"
          >
            Verify
          </LoadingButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
