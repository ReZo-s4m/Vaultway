"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { AuthUser } from "@vaultway/shared";
import { UserRole } from "@vaultway/shared/src/enums";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identity: string, secret: string) => Promise<void>;
  register: (name: string, username: string, email: string, secret: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("vw_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("vw_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (identity: string, secret: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerIdentity = identity.toLowerCase();
    
    // 1. Check default seeded test account
    const isTestAccount = 
      (lowerIdentity === "test" || lowerIdentity === "test@vaultway.com") && 
      secret === "123456";

    let matchedUser: AuthUser | null = null;

    if (isTestAccount) {
      matchedUser = {
        id: "mock-user-test-id",
        email: "test@vaultway.com",
        username: "test",
        name: "Test User",
        role: UserRole.USER,
        avatarUrl: null,
      };
    } else {
      // 2. Check registered users database in localStorage
      try {
        const registeredUsers = JSON.parse(localStorage.getItem("vw_registered_users") || "[]");
        const found = registeredUsers.find(
          (u: any) => 
            (u.email.toLowerCase() === lowerIdentity || u.username.toLowerCase() === lowerIdentity) && 
            u.password === secret
        );
        if (found) {
          matchedUser = {
            id: `mock-user-${found.username}`,
            email: found.email,
            username: found.username,
            name: found.name,
            role: UserRole.USER,
            avatarUrl: null,
          };
        }
      } catch (e) {
        console.error("Error reading mockup user database", e);
      }
    }

    if (!matchedUser) {
      setIsLoading(false);
      throw new Error("Invalid username/email or password.");
    }

    localStorage.setItem("vw_user", JSON.stringify(matchedUser));
    setUser(matchedUser);
    setIsLoading(false);
  };

  const register = async (
    name: string,
    username: string,
    email: string,
    secret: string
  ) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerUsername = username.toLowerCase();
    const lowerEmail = email.toLowerCase();

    // Check reserved or existing accounts
    if (lowerUsername === "test" || lowerUsername === "admin") {
      setIsLoading(false);
      throw new Error(`Username '${username}' is reserved.`);
    }

    try {
      const registeredUsers = JSON.parse(localStorage.getItem("vw_registered_users") || "[]");
      
      const usernameExists = registeredUsers.some((u: any) => u.username.toLowerCase() === lowerUsername);
      if (usernameExists) {
        setIsLoading(false);
        throw new Error("Username is already taken.");
      }

      const emailExists = registeredUsers.some((u: any) => u.email.toLowerCase() === lowerEmail);
      if (emailExists) {
        setIsLoading(false);
        throw new Error("Email is already registered.");
      }

      // Add to database
      const newUser = {
        name,
        username: lowerUsername,
        email: lowerEmail,
        password: secret,
      };
      registeredUsers.push(newUser);
      localStorage.setItem("vw_registered_users", JSON.stringify(registeredUsers));

      const mockUser: AuthUser = {
        id: `mock-user-${lowerUsername}`,
        email: lowerEmail,
        username: lowerUsername,
        name,
        role: UserRole.USER,
        avatarUrl: null,
      };

      localStorage.setItem("vw_user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (e: any) {
      setIsLoading(false);
      throw new Error(e.message || "Registration failed.");
    }

    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    localStorage.removeItem("vw_user");
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
