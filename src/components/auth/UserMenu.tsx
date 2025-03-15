
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, UserCog } from "lucide-react";

export function UserMenu() {
  const { user, signOut, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth/login");
  };

  if (!user) {
    return (
      <Button variant="outline" size="sm" asChild>
        <Link to="/auth/login">
          <User className="mr-2 h-4 w-4" /> Log in
        </Link>
      </Button>
    );
  }

  const getInitials = (email: string): string => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8 p-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(user.email || "")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center" asChild>
          <Link to="/profile">
            <User className="mr-2 h-4 w-4" /> Profile
          </Link>
        </DropdownMenuItem>
        
        {hasRole("administrator") && (
          <DropdownMenuItem className="flex items-center" asChild>
            <Link to="/profile">
              <UserCog className="mr-2 h-4 w-4" /> User Management
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center text-red-600" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
