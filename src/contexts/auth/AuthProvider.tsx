
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
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRoles, setUserRoles] = useState<TmsRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      
      if (session?.user) {
        fetchUserRolesAndUpdate(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session?.user);
        
        if (session?.user) {
          await fetchUserRolesAndUpdate(session.user.id);
        } else {
          setUserRoles([]);
          setIsLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserRolesAndUpdate = async (userId: string) => {
    try {
      setIsLoading(true);
      
      // Fetch roles with email check for special admin
      const roles = await fetchUserRoles(userId, user?.email);
      setUserRoles(roles);
      
      // If no roles are found, assign a default one
      if (roles.length === 0) {
        await assignDefaultRole(userId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const assignDefaultRole = async (userId: string) => {
    try {
      setIsLoading(true);
      await assignRole(userId);
      // Refresh user roles after assigning
      const roles = await fetchUserRoles(userId, user?.email);
      setUserRoles(roles);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authSignIn(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { userId } = await authSignUp(email, password);
      
      // Assign a default role to the new user if we have a user ID
      if (userId) {
        try {
          await assignDefaultRole(userId);
        } catch (roleError) {
          console.error('Error assigning default role during signup:', roleError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await authSignOut();
    } finally {
      setIsLoading(false);
    }
  };

  const hasRole = (role: TmsRole): boolean => {
    return checkRole(userRoles, role);
  };

  const hasAnyRole = (roles: TmsRole[]): boolean => {
    return checkAnyRole(userRoles, roles);
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
