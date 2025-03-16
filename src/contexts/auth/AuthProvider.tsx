
import React, { createContext } from "react";

// Create a placeholder auth context with no actual auth functionality
export const AuthContext = createContext<any>({
  isAuthenticated: true,
  isLoading: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  // Always provide these values to avoid undefined errors
  const contextValue = {
    isAuthenticated: true,
    isLoading: false
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
