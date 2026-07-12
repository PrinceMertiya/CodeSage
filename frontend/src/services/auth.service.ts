import { api } from "./api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt?: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: AuthUser;
}

interface SignupResponse {
  success: boolean;
  message: string;
  token: string;
  user: AuthUser;
}

interface MeResponse {
  success: boolean;
  user: AuthUser;
}

export const AuthService = {
  login: (email: string, password: string) =>
    api.post<LoginResponse>("/auth/login", {
      email,
      password,
    }),

  signup: (
    name: string,
    email: string,
    password: string,
  ) =>
    api.post<SignupResponse>("/auth/signup", {
      name,
      email,
      password,
    }),

  getMe: () =>
    api.get<MeResponse>("/auth/me"),
};