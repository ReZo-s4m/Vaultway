"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const signUpSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain alphanumeric characters and underscores",
      }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSuccess: () => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setApiError(null);
    setIsSubmitting(true);
    try {
      await registerUser(data.name, data.username.toLowerCase(), data.email, data.password);
      onSuccess();
    } catch (err: any) {
      setApiError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {apiError && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs sm:text-sm animate-shake">
          {apiError}
        </div>
      )}

      {/* Name Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Jane Doe"
          {...register("name")}
          className="w-full bg-black/30 text-white placeholder-zinc-500 border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#c4844a]/70 focus:ring-1 focus:ring-[#c4844a]/35 transition-all text-sm"
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Username Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
          Username
        </label>
        <input
          type="text"
          placeholder="janedoe"
          {...register("username")}
          className="w-full bg-black/30 text-white placeholder-zinc-500 border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#c4844a]/70 focus:ring-1 focus:ring-[#c4844a]/35 transition-all text-sm"
        />
        {errors.username && (
          <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
          Email Address
        </label>
        <input
          type="email"
          placeholder="jane@example.com"
          {...register("email")}
          className="w-full bg-black/30 text-white placeholder-zinc-500 border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#c4844a]/70 focus:ring-1 focus:ring-[#c4844a]/35 transition-all text-sm"
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            className="w-full bg-black/30 text-white placeholder-zinc-500 border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#c4844a]/70 focus:ring-1 focus:ring-[#c4844a]/35 transition-all text-sm pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword")}
            className="w-full bg-black/30 text-white placeholder-zinc-500 border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#c4844a]/70 focus:ring-1 focus:ring-[#c4844a]/35 transition-all text-sm pr-11"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-400 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full relative flex items-center justify-center font-semibold text-[#1c120c] bg-gradient-to-b from-[#efd3b4] to-[#c4844a] rounded-xl py-3 hover:brightness-110 transition-all text-sm mt-5 group overflow-hidden disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin text-black" size={18} />
        ) : (
          <span className="flex items-center gap-1">
            Create account
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        )}
      </button>

      <p className="text-center text-xs text-zinc-500 pt-2">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-white hover:underline transition-colors font-medium"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
