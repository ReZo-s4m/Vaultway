"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  identity: z
    .string()
    .min(3, { message: "Username or email must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface SignInFormProps {
  onSuccess: () => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oauthNotice, setOauthNotice] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identity: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    setIsSubmitting(true);
    try {
      await login(data.identity, data.password);
      onSuccess();
    } catch (err: any) {
      setApiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {apiError && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs sm:text-sm animate-shake">
          {apiError}
        </div>
      )}

      {/* Identity Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
          Username or Email
        </label>
        <input
          type="text"
          placeholder="developer@vaultway.com"
          {...register("identity")}
          className="w-full bg-black/30 text-white placeholder-zinc-500 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#c4844a]/70 focus:ring-1 focus:ring-[#c4844a]/35 transition-all text-sm"
        />
        {errors.identity && (
          <p className="text-red-400 text-xs mt-1">{errors.identity.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-[#e4c09a] hover:text-[#f3d7b8] transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            className="w-full bg-black/30 text-white placeholder-zinc-500 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#c4844a]/70 focus:ring-1 focus:ring-[#c4844a]/35 transition-all text-sm pr-11"
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full relative flex items-center justify-center font-semibold text-[#1c120c] bg-gradient-to-b from-[#efd3b4] to-[#c4844a] rounded-xl py-3 hover:brightness-110 transition-all text-sm mt-6 group overflow-hidden disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin text-black" size={18} />
        ) : (
          <span className="flex items-center gap-1">
            Log in
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

      {/* Social Divider */}
      <div className="flex items-center gap-4 py-2">
        <div className="h-px bg-white/10 flex-1" />
        <span className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">
          or
        </span>
        <div className="h-px bg-white/10 flex-1" />
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={() => setOauthNotice(true)}
        className="w-full flex items-center justify-center gap-2.5 bg-white/[0.03] hover:bg-white/[0.06] text-white border border-white/10 rounded-xl py-3 px-4 transition-colors text-sm"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
        </svg>
        <span>Continue with Google</span>
      </button>

      {oauthNotice && (
        <p className="text-center text-[11px] text-zinc-500">
          Google sign-in isn&apos;t wired up in this demo yet — use the email
          and password fields above.
        </p>
      )}

      <p className="text-center text-xs text-zinc-500 pt-4">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-white hover:underline transition-colors font-medium"
        >
          Sign up for free
        </Link>
      </p>

      <p className="text-center text-[11px] text-zinc-600 pt-1">
        Exploring the demo? Sign in with{" "}
        <code className="rounded bg-white/5 px-1 py-0.5 font-mono text-zinc-400">
          test
        </code>{" "}
        /{" "}
        <code className="rounded bg-white/5 px-1 py-0.5 font-mono text-zinc-400">
          123456
        </code>
      </p>
    </form>
  );
}
