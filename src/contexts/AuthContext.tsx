
import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type TmsRole = 
  | "administrator" 
  | "dispatcher" 
  | "planner" 
  | "freight_manager" 
  | "master_data_specialist" 
  | "finance" 
  | "customer_service" 
  | "shipper" 
  | "carrier" 
  | "transportation_manager";

type UserRoles = {
  id: string;
  user_id: string;
  role: TmsRole;
  office_id: string | null;
  created_at: string;
  updated_at: string;
};

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  userRoles: TmsRole[];
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  hasRole: (role: TmsRole) => boolean;
  hasAnyRole: (roles: TmsRole[]) => boolean;
  isAuthenticated: boolean; 
  assignDefaultRole: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRoles, setUserRoles] = useState<TmsRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      
      if (session?.user) {
        fetchUserRoles(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session?.user);
        
        if (session?.user) {
          await fetchUserRoles(session.user.id);
        } else {
          setUserRoles([]);
          setIsLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserRoles = async (userId: string) => {
    try {
      setIsLoading(true);
      
      // Check if this email is the known administrator
      if (user?.email === "puiu.adrian@gmail.com") {
        setUserRoles(["administrator"]);
        return;
      }
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching user roles:', error);
        // If no roles are found, assign a default one
        if (error.code === 'PGRST116') {
          await assignDefaultRole(userId);
        } else {
          // Check for infinite recursion error in RLS policy
          if (error.code === "42P17" && error.message.includes("infinite recursion")) {
            console.warn("RLS policy issue detected when fetching roles, applying fallback handling");
            // Let's fallback to a default set of roles or an empty array
            setUserRoles([]);
          } else {
            throw error;
          }
        }
      } else if (data) {
        if (data.length === 0) {
          // No roles found, assign a default one
          await assignDefaultRole(userId);
        } else {
          setUserRoles(data.map((role: UserRoles) => role.role));
        }
      }
    } catch (error) {
      console.error('Error fetching user roles:', error);
      toast({
        title: "Error",
        description: "Failed to load user roles",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const assignDefaultRole = async (userId: string) => {
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
      
      // Refresh user roles
      await fetchUserRoles(userId);
      
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
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      // Assign a default role to the new user if we have a user ID
      if (data?.user?.id) {
        try {
          await assignDefaultRole(data.user.id);
        } catch (roleError) {
          console.error('Error assigning default role during signup:', roleError);
        }
      }
      
      toast({
        title: "Registration Successful",
        description: "Please check your email to confirm your account",
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasRole = (role: TmsRole): boolean => {
    return userRoles.includes(role);
  };

  const hasAnyRole = (roles: TmsRole[]): boolean => {
    return roles.some(role => userRoles.includes(role));
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRoles,
        isLoading,
        signIn,
        signUp,
        signOut,
        hasRole,
        hasAnyRole,
        isAuthenticated,
        assignDefaultRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
