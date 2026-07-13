"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInFlowLayout } from "@/components/ui/sign-in-flow-1";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const handleSuccessEnd = () => {
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <SignInFlowLayout
      title="Create account"
      subtitle="Start protecting your files with AES-256 encryption"
      isSuccess={isSuccess}
      successMessage="Generating secure workspace keys..."
      onSuccessEnd={handleSuccessEnd}
    >
      <SignUpForm onSuccess={handleSuccess} />
    </SignInFlowLayout>
  );
}
