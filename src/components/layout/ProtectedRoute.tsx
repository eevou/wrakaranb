import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/store/authContext";
import { AppLayout } from "@/components/layout/AppLayout";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
