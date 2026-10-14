"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { SignInFlowLayout } from "@/components/ui/sign-in-flow-1";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <SignInFlowLayout
      title="Reset password"
      subtitle={isSubmitted ? "No email is sent in this demo" : "Password reset email is not wired in this project"}
      isSuccess={false}
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
              Email Address
            </label>
            <input
              type="email"
              placeholder="jane@example.com"
              {...register("email")}
              className="w-full bg-black/30 text-white placeholder-zinc-500 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#c4844a]/70 focus:ring-1 focus:ring-[#c4844a]/35 transition-all text-sm"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative flex items-center justify-center font-semibold text-[#1c120c] bg-gradient-to-b from-[#efd3b4] to-[#c4844a] rounded-xl py-3 hover:brightness-110 transition-all text-sm mt-6 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin text-black" size={18} />
            ) : (
              <span>Send recovery link</span>
            )}
          </button>

          <p className="text-center text-xs text-zinc-500 pt-4">
            Remembered your password?{" "}
            <Link
              href="/sign-in"
              className="text-white hover:underline transition-colors font-medium"
            >
              Log in
            </Link>
          </p>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-zinc-300 text-sm leading-relaxed">
            This demo does not send email. Sign in with the password you used at
            sign-up, or the test account if you have it.
          </p>
          <div className="pt-4">
            <Link
              href="/sign-in"
              className="inline-block w-full font-semibold text-[#1c120c] bg-gradient-to-b from-[#efd3b4] to-[#c4844a] rounded-xl py-3 hover:brightness-110 transition-all text-sm"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      )}
    </SignInFlowLayout>
  );
}
