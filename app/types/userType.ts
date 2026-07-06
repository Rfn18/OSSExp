export interface Role {
  id: string;
  name: string;
  guard_name: string;
}

export interface User {
  id: string;
  profile_picture?: string | null;
  name: string;
  email: string;
  role_id: string;
  role?: Role;
  is_active: boolean;
}
