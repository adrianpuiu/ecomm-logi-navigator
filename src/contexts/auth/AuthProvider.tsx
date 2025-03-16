
import React, { createContext } from "react";

// Create a placeholder auth context with no actual auth functionality
export const AuthContext = createContext<any>({
  isAuthenticated: true,
  isLoading: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <AuthContext.Provider value={{ isAuthenticated: true, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
};
