
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, TmsRole } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { SidebarProvider, Sidebar } from "@/components/layout/Sidebar";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: TmsRole[];
  fallbackPath?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  fallbackPath = "/auth/login",
}) => {
  const { user, userRoles, isLoading, hasAnyRole, isAuthenticated, assignDefaultRole } = useAuth();

  // Attempt to assign default role if no roles are present
  useEffect(() => {
    const checkAndAssignRole = async () => {
      if (user && userRoles.length === 0) {
        await assignDefaultRole(user.id);
      }
    };
    
    if (user && !isLoading) {
      checkAndAssignRole();
    }
  }, [user, userRoles, isLoading, assignDefaultRole]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }

  // If authenticated but doesn't have the required role, show unauthorized page
  // but still maintain the sidebar and layout
  if (!hasAnyRole(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has the required role
  return <>{children}</>;
};
