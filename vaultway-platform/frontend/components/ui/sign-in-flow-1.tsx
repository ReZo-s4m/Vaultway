"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CanvasRevealEffect } from "./canvas-reveal-effect";

interface SignInFlowLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  isSuccess?: boolean;
  successMessage?: string;
  onSuccessEnd?: () => void;
  className?: string;
}

function MiniNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass("rounded-xl");
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full");
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-b from-[#efd3b4] to-[#c4844a] font-bold text-[#1c120c] text-xs">
        V
      </div>
      <span className="text-sm font-semibold tracking-tight text-white">
        Vaultway
      </span>
    </Link>
  );

  const navLinksData = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features/storage" },
    { label: "Security", href: "/security" },
    { label: "Pricing", href: "/pricing" },
  ];

  const loginButtonElement = (
    <Link
      href="/sign-in"
      className="px-4 py-2 text-xs border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 w-full sm:w-auto text-center"
    >
      Log in
    </Link>
  );

  const signupButtonElement = (
    <Link
      href="/sign-up"
      className="relative group w-full sm:w-auto text-center"
    >
      <div className="absolute inset-0 -m-1 rounded-full hidden sm:block bg-gray-100 opacity-20 filter blur-md pointer-events-none transition-all duration-300 ease-out group-hover:opacity-40 group-hover:blur-lg"></div>
      <button className="relative z-10 w-full px-4 py-2 text-xs font-semibold text-[#1c120c] bg-gradient-to-b from-[#efd3b4] to-[#c4844a] rounded-full hover:brightness-110 transition-all duration-200">
        Sign up
      </button>
    </Link>
  );

  return (
    <header
      className={cn(
        "fixed top-6 left-1/2 transform -translate-x-1/2 z-20",
        "flex flex-col items-center",
        "pl-6 pr-6 py-3 backdrop-blur-md",
        headerShapeClass,
        "border border-white/10 bg-[#14110e]/60",
        "w-[calc(100%-2rem)] sm:w-auto",
        "transition-[border-radius] duration-300 ease-in-out"
      )}
    >
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <div className="flex items-center">{logoElement}</div>

        <nav className="hidden sm:flex items-center space-x-5 text-xs font-medium">
          {navLinksData.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2">
          {loginButtonElement}
          {signupButtonElement}
        </div>

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      <div
        className={cn(
          "sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden",
          isOpen
            ? "max-h-[1000px] opacity-100 pt-4"
            : "max-h-0 opacity-0 pt-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center space-y-3 text-sm w-full">
          {navLinksData.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition-colors w-full text-center py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-3 mt-4 w-full pt-3 border-t border-white/5">
          {loginButtonElement}
          <div className="w-full" onClick={() => setIsOpen(false)}>
            {signupButtonElement}
          </div>
        </div>
      </div>
    </header>
  );
}

export const SignInFlowLayout = ({
  children,
  title,
  subtitle,
  isSuccess = false,
  successMessage = "Welcome inside",
  onSuccessEnd,
  className,
}: SignInFlowLayoutProps) => {
  const [initialCanvasVisible, setInitialCanvasVisible] = useState(true);
  const [reverseCanvasVisible, setReverseCanvasVisible] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setReverseCanvasVisible(true);
      const timer1 = setTimeout(() => {
        setInitialCanvasVisible(false);
      }, 50);
      const timer2 = setTimeout(() => {
        if (onSuccessEnd) onSuccessEnd();
      }, 2200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setReverseCanvasVisible(false);
      setInitialCanvasVisible(true);
    }
  }, [isSuccess, onSuccessEnd]);

  return (
    <div
      className={cn(
        "flex w-full flex-col min-h-screen bg-black relative overflow-x-hidden text-white font-sans",
        className
      )}
    >
      {/* Background Canvas Layer */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {initialCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[
                [255, 255, 255],
                [255, 255, 255],
              ]}
              dotSize={6}
              reverse={false}
            />
          </div>
        )}

        {reverseCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={4}
              containerClassName="bg-black"
              colors={[
                [255, 255, 255],
                [255, 255, 255],
              ]}
              dotSize={6}
              reverse={true}
            />
          </div>
        )}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,1)_0%,_transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col flex-1">
        <MiniNavbar />

        <div className="flex flex-1 flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="w-full max-w-[440px] space-y-6">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f6f1e8] bg-gradient-to-r from-[#f6f1e8] via-[#f3e0c8] to-[#c4844a] bg-clip-text text-transparent">
                      {title}
                    </h1>
                    <p className="text-zinc-400 font-light text-sm sm:text-base">
                      {subtitle}
                    </p>
                  </div>

                  {/* Form Content */}
                  <div className="bg-[#14110e]/70 border border-[#c4844a]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
                    {children}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center space-y-6 py-8"
                >
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-white">
                      You&apos;re in!
                    </h1>
                    <p className="text-zinc-400 font-light">{successMessage}</p>
                  </div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                    className="py-6"
                  >
                    <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-white to-zinc-200 flex items-center justify-center shadow-xl shadow-white/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </motion.div>

                  <p className="text-zinc-500 text-xs animate-pulse">
                    Preparing secure workspace...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
