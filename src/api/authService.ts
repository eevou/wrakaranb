/**
 * Auth Service
 * All authentication-related API calls to the .NET backend.
 */

import { apiClient, extractData } from "./client";
import { ENDPOINTS } from "./endpoints";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "@/types/auth";

export const authService = {
  /**
   * POST /auth/login
   * Returns JWT token + user profile.
   */
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, data).then(extractData),

  /**
   * POST /auth/logout
   */
  logout: () => apiClient.post(ENDPOINTS.AUTH.LOGOUT).then(extractData),

  /**
   * POST /auth/register
   */
  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data).then(extractData),

  /**
   * GET /auth/me
   * Fetch the currently authenticated user.
   */
  getMe: () => apiClient.get<User>(ENDPOINTS.AUTH.ME).then(extractData),

  /**
   * POST /auth/refresh
   * Exchange a refresh token for a new access token.
   */
  refreshToken: (refreshToken: string) =>
    apiClient
      .post<AuthResponse>(ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken })
      .then(extractData),

  /**
   * POST /auth/forgot-password
   */
  forgotPassword: (email: string) =>
    apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }).then(extractData),

  /**
   * POST /auth/reset-password
   */
  resetPassword: (token: string, newPassword: string) =>
    apiClient
      .post(ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword })
      .then(extractData),
};
