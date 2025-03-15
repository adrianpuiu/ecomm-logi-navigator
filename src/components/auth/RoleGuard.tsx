
import React from "react";
import { TmsRole } from "@/contexts/auth";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: TmsRole[];
  fallbackPath?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
}) => {
  // Always render the children with auth completely removed
  return <>{children}</>;
};
