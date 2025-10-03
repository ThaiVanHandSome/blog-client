import ResetPasswordPage from "@/app/(end-user)/auth/reset-password/ResetPasswordPage";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  );
}
