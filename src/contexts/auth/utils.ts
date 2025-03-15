
import { TmsRole } from "./types";

// Dummy implementations for auth-related functions
export const hasRole = (): boolean => true;
export const hasAnyRole = (): boolean => true;
export const fetchUserRoles = async (): Promise<TmsRole[]> => [];
export const assignDefaultRole = async (): Promise<void> => {};
export const signIn = async (): Promise<void> => {};
export const signUp = async (): Promise<{ userId: string | undefined }> => ({ userId: undefined });
export const signOut = async (): Promise<void> => {};
