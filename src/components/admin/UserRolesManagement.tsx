
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TmsRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, UserPlus } from "lucide-react";

interface User {
  id: string;
  email: string;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: TmsRole;
  office_id: string | null;
}

interface Office {
  id: string;
  name: string;
  location: string | null;
}

export function UserRolesManagement() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState("");

  // Define all available roles
  const availableRoles: TmsRole[] = [
    "administrator",
    "dispatcher",
    "planner",
    "freight_manager",
    "master_data_specialist",
    "finance",
    "customer_service",
    "shipper",
    "carrier",
    "transportation_manager"
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('id, email, created_at');

      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Fetch user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;
      setUserRoles(rolesData || []);

      // Fetch offices
      const { data: officesData, error: officesError } = await supabase
        .from('offices')
        .select('*');

      if (officesError) throw officesError;
      setOffices(officesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignRole = async (userId: string, role: TmsRole, officeId: string | null = null) => {
    try {
      // Check if user already has this role
      const existingRole = userRoles.find(ur => ur.user_id === userId && ur.role === role);
      if (existingRole) {
        toast({
          title: "Role Already Assigned",
          description: `This user already has the ${role} role.`,
          variant: "default",
        });
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .insert([
          { user_id: userId, role, office_id: officeId }
        ])
        .select();

      if (error) throw error;

      setUserRoles([...userRoles, ...(data || [])]);
      toast({
        title: "Role Assigned",
        description: `Successfully assigned ${role} role to user.`,
      });
    } catch (error) {
      console.error('Error assigning role:', error);
      toast({
        title: "Error",
        description: "Failed to assign role",
        variant: "destructive",
      });
    }
  };

  const handleRemoveRole = async (roleId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .match({ id: roleId });

      if (error) throw error;

      setUserRoles(userRoles.filter(role => role.id !== roleId));
      toast({
        title: "Role Removed",
        description: "Successfully removed role from user.",
      });
    } catch (error) {
      console.error('Error removing role:', error);
      toast({
        title: "Error",
        description: "Failed to remove role",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Role Management</CardTitle>
        <CardDescription>
          Assign and manage roles for users in the TMS system
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Users and Their Roles</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead>Assign New Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.email}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              {userRoles
                                .filter(role => role.user_id === user.id)
                                .map(role => (
                                  <Badge key={role.id} className="flex items-center gap-1">
                                    {role.role}
                                    <button
                                      onClick={() => handleRemoveRole(role.id)}
                                      className="ml-1 rounded-full p-1 hover:bg-red-500/20"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </Badge>
                                ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Select
                                onValueChange={(value) => 
                                  handleAssignRole(user.id, value as TmsRole)
                                }
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableRoles.map(role => (
                                    <SelectItem key={role} value={role}>
                                      {role}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
