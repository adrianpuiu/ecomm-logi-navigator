
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const useAuth = () => {
  // Return an empty object if context is not available
  // This makes it safer to use without providers
  const context = useContext(AuthContext);
  return context || {};
};
