
import React, { createContext } from "react";
import { TmsRole, AuthContextProps } from "./types";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  // Create a completely simplified auth context with no actual auth
  const hasRole = () => true;
  const hasAnyRole = () => true;

  return (
    <AuthContext.Provider
      value={{
        session: null,
        user: null,
        userRoles: [],
        isLoading: false,
        signIn: async () => {},
        signUp: async () => {}, // Fixed: return type is now void instead of { userId: undefined }
        signOut: async () => {},
        hasRole,
        hasAnyRole,
        isAuthenticated: true,
        assignDefaultRole: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
