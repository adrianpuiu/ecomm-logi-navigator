
import React, { createContext } from "react";

// Create a placeholder auth context with no actual auth functionality
export const AuthContext = createContext<any>({});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};
