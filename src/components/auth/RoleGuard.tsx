
import React from "react";
import { TmsRole } from "@/contexts/auth";

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
  // Auth is disabled, so we always render the children
  return <>{children}</>;
};
