
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { TmsRole } from "./types";

// Function to check if a user has a specific role
export const hasRole = (userRoles: TmsRole[], role: TmsRole): boolean => {
  return userRoles.includes(role);
};

// Function to check if a user has any of the specified roles
export const hasAnyRole = (userRoles: TmsRole[], roles: TmsRole[]): boolean => {
  return roles.some(role => userRoles.includes(role));
};

// Function to fetch user roles from the database
export const fetchUserRoles = async (userId: string, userEmail?: string | null): Promise<TmsRole[]> => {
  try {
    // Check if this email is the known administrator
    if (userEmail === "puiu.adrian@gmail.com") {
      return ["administrator"];
    }
    
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user roles:', error);
      // Check for infinite recursion error in RLS policy
      if (error.code === "42P17" && error.message.includes("infinite recursion")) {
        console.warn("RLS policy issue detected when fetching roles, applying fallback handling");
        return [];
      }
      throw error;
    }

    if (data && data.length > 0) {
      return data.map((role: any) => role.role);
    }
    
    return [];
  } catch (error) {
    console.error('Error in fetchUserRoles:', error);
    toast({
      title: "Error",
      description: "Failed to load user roles",
      variant: "destructive",
    });
    return [];
  }
};

// Function to assign a default admin role to a user
export const assignDefaultRole = async (userId: string): Promise<void> => {
  try {
    // First, check if we need to create a default office
    let officeId: string | null = null;
    
    const { data: officesData, error: officesError } = await supabase
      .from('offices')
      .select('id')
      .limit(1);
      
    if (officesError) {
      console.error('Error fetching offices:', officesError);
    } else if (!officesData || officesData.length === 0) {
      // No office exists, create a default one
      const { data: newOffice, error: officeError } = await supabase
        .from('offices')
        .insert([{ name: 'Main Office', location: 'Headquarters' }])
        .select();
        
      if (officeError) {
        console.error('Error creating default office:', officeError);
      } else if (newOffice && newOffice.length > 0) {
        officeId = newOffice[0].id;
      }
    } else {
      officeId = officesData[0].id;
    }
    
    // Assign administrator role to the user
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert([{ 
        user_id: userId, 
        role: 'administrator',
        office_id: officeId
      }]);
      
    if (roleError) {
      console.error('Error assigning default role:', roleError);
      throw roleError;
    }
    
    toast({
      title: "Administrator Access Granted",
      description: "You have been assigned as an administrator."
    });
  } catch (error) {
    console.error('Error in assignDefaultRole:', error);
    toast({
      title: "Error",
      description: "Failed to assign default role",
      variant: "destructive",
    });
    throw error;
  }
};

// Auth functions for sign in, sign up, and sign out
export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  } catch (error: any) {
    toast({
      title: "Login Failed",
      description: error.message || "An error occurred during login",
      variant: "destructive",
    });
    throw error;
  }
};

export const signUp = async (email: string, password: string): Promise<{ userId: string | undefined }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    
    toast({
      title: "Registration Successful",
      description: "Please check your email to confirm your account",
    });
    
    return { userId: data?.user?.id };
  } catch (error: any) {
    toast({
      title: "Registration Failed",
      description: error.message || "An error occurred during registration",
      variant: "destructive",
    });
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    toast({
      title: "Error",
      description: "Failed to sign out",
      variant: "destructive",
    });
    throw error;
  }
};
