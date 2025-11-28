// types.ts
export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ACCOUNTANT = 'accountant',
  MANAGER = 'manager'
}


export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}