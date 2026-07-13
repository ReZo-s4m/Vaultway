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
      subtitle={isSubmitted ? "Check your email inbox" : "Enter your email to receive a secure reset link"}
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
              className="w-full bg-black/30 text-white placeholder-zinc-500 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative flex items-center justify-center font-semibold text-black bg-white rounded-xl py-3 hover:bg-zinc-100 transition-all text-sm mt-6 disabled:opacity-75 disabled:cursor-not-allowed"
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
            We&apos;ve sent a password reset link to your email address. It should arrive shortly.
          </p>
          <div className="pt-4">
            <Link
              href="/sign-in"
              className="inline-block w-full font-semibold text-black bg-white rounded-xl py-3 hover:bg-zinc-100 transition-all text-sm"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      )}
    </SignInFlowLayout>
  );
}
