/**
 * API Client — ready for .NET backend connection.
 * Replace mock functions with real axios calls when backend is ready.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://localhost:7001/api";

export const ENDPOINTS = {
  AUTH: {
    LOGIN:           "/auth/login",
    LOGOUT:          "/auth/logout",
    REGISTER:        "/auth/register",
    ME:              "/auth/me",
    REFRESH:         "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  USERS: {
    LIST:   "/users",
    DETAIL: (id: string) => `/users/${id}`,
    CREATE: "/users",
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
  DASHBOARD: {
    STATS:      "/dashboard/stats",
    CHART_DATA: "/dashboard/chart",
  },
  NOTIFICATIONS: {
    LIST:     "/notifications",
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL: "/notifications/read-all",
  },
} as const;
