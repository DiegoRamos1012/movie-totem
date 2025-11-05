import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const Dashboard = lazy(() => import("../pages/Dashboard"));

function ProtectedLayout() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Privadas */}
      <Route element={<ProtectedLayout />}>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Dashboard />
            </Suspense>
          }
        />
      </Route>

      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
