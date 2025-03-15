
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
import { Link } from "react-router-dom";
import { LogOut, User, UserCog } from "lucide-react";

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8 p-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Admin (Auth Disabled)</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center" asChild>
          <Link to="/profile">
            <User className="mr-2 h-4 w-4" /> Profile
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="flex items-center" asChild>
          <Link to="/profile">
            <UserCog className="mr-2 h-4 w-4" /> User Management
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center text-red-600">
          <LogOut className="mr-2 h-4 w-4" /> Log out (Disabled)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
