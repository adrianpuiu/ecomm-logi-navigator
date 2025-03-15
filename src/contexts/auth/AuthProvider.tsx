
import React, { createContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextProps, TmsRole } from "./types";
import { 
  fetchUserRoles, 
  assignDefaultRole as assignRole, 
  hasRole as checkRole, 
  hasAnyRole as checkAnyRole,
  signIn as authSignIn,
  signUp as authSignUp,
  signOut as authSignOut
} from "./utils";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  // Create a mock user and session when auth is disabled
  const mockUser: User = {
    id: "mock-user-id",
    email: "admin@example.com",
    created_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
  };
  
  const [session, setSession] = useState<Session | null>({
    access_token: "mock-token",
    refresh_token: "mock-refresh-token",
    expires_at: 9999999999,
    expires_in: 9999999999,
    user: mockUser,
  });
  
  const [user, setUser] = useState<User | null>(mockUser);
  const [userRoles, setUserRoles] = useState<TmsRole[]>(["administrator"]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Skip actual auth calls since we're mocking everything
  const fetchUserRolesAndUpdate = async (userId: string) => {
    // No-op when auth is disabled
    return;
  };

  const assignDefaultRole = async (userId: string) => {
    // No-op when auth is disabled
    return;
  };

  const signIn = async (email: string, password: string) => {
    // No-op when auth is disabled
    console.log("Auth disabled: Sign in skipped");
  };

  const signUp = async (email: string, password: string) => {
    // No-op when auth is disabled
    console.log("Auth disabled: Sign up skipped");
  };

  const signOut = async () => {
    // No-op when auth is disabled
    console.log("Auth disabled: Sign out skipped");
  };

  const hasRole = (role: TmsRole): boolean => {
    // Always return true for any role when auth is disabled
    return true;
  };

  const hasAnyRole = (roles: TmsRole[]): boolean => {
    // Always return true for any roles when auth is disabled
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRoles,
        isLoading,
        signIn,
        signUp,
        signOut,
        hasRole,
        hasAnyRole,
        isAuthenticated,
        assignDefaultRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
