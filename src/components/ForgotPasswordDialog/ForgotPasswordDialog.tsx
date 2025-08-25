"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import FormInput from "../form/FormInput";
import LoadingButton from "../LoadingButton";
import { fetchApi } from "@/utils/fetchApi";
import { API_ENDPOINTS } from "@/constants/api";
import { forgotPasswordDialogAtom, verifyTokenDialogAtom } from "@/atom";
import { useAtom } from "jotai";
import { useMutation } from "@tanstack/react-query";

interface FormInputType {
  email: string;
}

const DEFAULT_VALUES: FormInputType = {
  email: ""
};

export default function ForgotPasswordDialog() {
  const { control, handleSubmit } = useForm<FormInputType>({
    defaultValues: DEFAULT_VALUES
  });

  const [isOpen, setForgotPasswordIsOpen] = useAtom(forgotPasswordDialogAtom);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setVerifyTokenIsOpen] = useAtom(verifyTokenDialogAtom);

  const sendTokenForgotPasswordMutation = useMutation({
    mutationFn: (data: FormInputType) =>
      fetchApi({
        url: API_ENDPOINTS.AUTH.SEND_EMAIL_FORGOT_PASSWORD,
        method: "POST",
        body: data
      })
  });

  const onSubmit = handleSubmit(async (data: FormInputType) => {
    sendTokenForgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        setForgotPasswordIsOpen(false);
        setVerifyTokenIsOpen(true);
      }
    });
  });

  return (
    <Dialog open={isOpen} onOpenChange={setForgotPasswordIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <FormInput type="email" required name="email" control={control} />
          <LoadingButton
            type="submit"
            loadingText="Send..."
            isLoading={sendTokenForgotPasswordMutation.isLoading}
            className="float-right mt-4"
          >
            Send
          </LoadingButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
