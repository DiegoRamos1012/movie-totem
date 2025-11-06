import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Management/Profile";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Movies = lazy(() => import("../pages/Management/Movies"));
const Screenings = lazy(() => import("../pages/Management/Screenings"));
const Theaters = lazy(() => import("../pages/Management/Theaters"));
const Tickets = lazy(() => import("../pages/Management/Tickets"));
const Snacks = lazy(() => import("../pages/Management/Snacks"));

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
        <Route
          path="/movies"
          element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Movies />
            </Suspense>
          }
        />
        <Route
          path="/screenings"
          element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Screenings />
            </Suspense>
          }
        />
        <Route
          path="/theaters"
          element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Theaters />
            </Suspense>
          }
        />
        <Route
          path="/tickets"
          element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Tickets />
            </Suspense>
          }
        />
        <Route
          path="/snacks"
          element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Snacks />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Profile />
            </Suspense>
          }
        />
      </Route>

      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
