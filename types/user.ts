export type UserRole = "USER" | "ADMIN";

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  name: string;
  repeatPassword: string;
}

export interface UserInfo {
  email: string;
  name: string;
  avatar?: string;
  points: number;
  role: UserRole;
}
export interface UserInfoClient extends UserInfo {
  id: string;
}

export interface UserDTO {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  name: string;
}
