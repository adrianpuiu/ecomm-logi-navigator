
import React from "react";
import { Helmet } from "react-helmet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function UserProfile() {
  const { toast } = useToast();
  
  return (
    <>
      <Helmet>
        <title>User Profile | Logistics TMS</title>
      </Helmet>
      
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
          <p className="text-muted-foreground">
            View and manage your profile information
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Your account details and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="text-base">user@example.com</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">User ID</h3>
                <p className="text-sm font-mono text-muted-foreground">user-123</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                onClick={() => toast({
                  title: "Feature coming soon",
                  description: "Profile editing will be available in a future update.",
                })}
              >
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Manage your account password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Password</h3>
                <p className="text-sm text-muted-foreground">
                  Last changed: Unknown
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline"
                onClick={() => toast({
                  title: "Feature coming soon",
                  description: "Password reset functionality will be available in a future update.",
                })}
              >
                Change Password
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
