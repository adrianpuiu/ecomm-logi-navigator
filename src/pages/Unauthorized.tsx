
import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  return (
    <>
      <Helmet>
        <title>Unauthorized | Logistics TMS</title>
      </Helmet>
      
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="mx-auto max-w-md text-center">
          <ShieldAlert className="mx-auto h-24 w-24 text-red-500" />
          <h1 className="mt-6 text-3xl font-bold">Access Denied</h1>
          <p className="mt-2 text-gray-600">
            You don't have permission to access this page. This area requires higher privileges.
          </p>
          <div className="mt-8 space-x-4">
            <Button asChild>
              <Link to="/">Return to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/auth/login">Switch Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
