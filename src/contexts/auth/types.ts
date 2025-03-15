
import { Session, User } from "@supabase/supabase-js";

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

export type UserRoles = {
  id: string;
  user_id: string;
  role: TmsRole;
  office_id: string | null;
  created_at: string;
  updated_at: string;
};

export interface AuthContextProps {
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
