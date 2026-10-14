  "use client";

  import React, { useState } from "react";
  import { useRouter } from "next/navigation";
  import { SignInFlowLayout } from "@/components/ui/sign-in-flow-1";
  import { SignInForm } from "@/components/auth/SignInForm";

  export default function SignInPage() {
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
        title="Welcome back"
        subtitle="Open your Cloud Drive workspace"
        isSuccess={isSuccess}
        successMessage="Opening your workspace..."
        onSuccessEnd={handleSuccessEnd}
      >
        <SignInForm onSuccess={handleSuccess} />
      </SignInFlowLayout>
    );
  }
