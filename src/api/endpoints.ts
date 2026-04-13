/**
 * API Endpoints
 *
 * Centralised list of every .NET API route used by the frontend.
 * Update these strings to match your controller routes.
 *
 * Convention: SCREAMING_SNAKE_CASE → kebab-case paths
 */

export const ENDPOINTS = {
  // ── Auth ────────────────────────────────────────────────────────────────────
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    REFRESH_TOKEN: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    ME: "/auth/me",
  },

  // ── Users ───────────────────────────────────────────────────────────────────
  USERS: {
    LIST: "/users",
    DETAIL: (id: string | number) => `/users/${id}`,
    CREATE: "/users",
    UPDATE: (id: string | number) => `/users/${id}`,
    DELETE: (id: string | number) => `/users/${id}`,
  },

  // ── TODO: Add your domain-specific endpoints below ──────────────────────────
  // Example:
  // PRODUCTS: {
  //   LIST: "/products",
  //   DETAIL: (id: string | number) => `/products/${id}`,
  //   CREATE: "/products",
  //   UPDATE: (id: string | number) => `/products/${id}`,
  //   DELETE: (id: string | number) => `/products/${id}`,
  // },
} as const;
