"use client";

import { forgotPasswordDialogAtom } from "@/atom";
import ForgotPasswordDialog from "@/components/ForgotPasswordDialog/ForgotPasswordDialog";
import VerifyTokenDialog from "@/components/VerifyTokenDialog";
import { TOKEN_TYPE_ENUM } from "@/components/VerifyTokenDialog/VerifyTokenDialog";
import { useAtom } from "jotai";
import Link from "next/link";
import React from "react";

interface ActionProps {
  useIn: "register" | "login";
}

export default function Action({ useIn }: ActionProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsOpen] = useAtom(forgotPasswordDialogAtom);

  return (
    <div className="flex items-center justify-between mb-4">
      <Link
        href={useIn === "login" ? "/auth/register" : "/auth/login"}
        className="text-xs font-semibold text-blue-700 block"
      >
        {useIn === "login" ? "Register?" : "Login?"}
      </Link>
      <span
        onClick={() => setIsOpen(true)}
        className="text-xs font-semibold text-blue-700 block cursor-pointer"
      >
        Forgot password?
      </span>
      <ForgotPasswordDialog />
      <VerifyTokenDialog type={TOKEN_TYPE_ENUM.FORGOT_PASSWORD} />
    </div>
  );
}
