
import React from "react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  fallbackPath?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
}) => {
  // Always render the children with auth completely removed
  return <>{children}</>;
};
