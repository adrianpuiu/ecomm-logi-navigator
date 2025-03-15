
// Since we can't modify the Sidebar component directly (it's read-only),
// we can inject our UserMenu into the navigation menu by creating a custom hook

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { UserMenu } from "@/components/auth/UserMenu";

// This hook will handle redirects for unauthenticated users
export function useAuthRedirect() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Skip checking during initial loading
    if (isLoading) return;

    // Skip auth redirects for these paths
    const authExemptPaths = ['/auth/login', '/unauthorized'];
    if (authExemptPaths.includes(location.pathname)) return;

    // Check if user is authenticated
    if (!user && !isLoading && !hasChecked) {
      navigate("/auth/login");
      setHasChecked(true);
    }
  }, [user, isLoading, navigate, location.pathname, hasChecked]);

  return { isAuthenticated: !!user };
}

// Export the original Sidebar but without importing it
// This resolves the circular reference
export { default as Sidebar } from "@/components/ui/sidebar";
