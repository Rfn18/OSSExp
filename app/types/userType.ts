export interface Role {
  id: number | string;
  name: string;
  guard_name: string;
}

export interface User {
  id: number | string;
  name: string;
  email: string;
  role_id: number | string;
  role: Role;
  profile_picture: string | null;
  is_active: boolean;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AuthData {
  user: User;
  token: string;
  token_type: string;
  expires_in: number;
}
