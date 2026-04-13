import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { User, AuthState, LoginRequest } from "@/types";
import { MOCK_CURRENT_USER, simulateDelay } from "@/data/mockData";

// ─── State & Actions ──────────────────────────────────────────────────────────
type Action =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function authReducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case "LOGIN_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "LOGOUT":
      return { ...initialState };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface AuthContextValue extends AuthState {
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(async (data: LoginRequest) => {
    dispatch({ type: "LOGIN_START" });
    try {
      // TODO: Replace with real API call:
      // const res = await axios.post(ENDPOINTS.AUTH.LOGIN, data);
      // const { user, token } = res.data;
      await simulateDelay(1000);

      // Mock validation
      if (data.email === "ahmed@example.com" && data.password === "password123") {
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem("access_token", token);
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: MOCK_CURRENT_USER, token } });
      } else {
        throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
    } catch (err: any) {
      dispatch({ type: "LOGIN_ERROR", payload: err.message });
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    dispatch({ type: "LOGOUT" });
  }, []);

  const clearError = useCallback(() => dispatch({ type: "CLEAR_ERROR" }), []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
