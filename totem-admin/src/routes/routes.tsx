import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

/* Aplique Lazy a todas as páginas, exceto a página Login, por ser a página inicial
Lazy de exemplo: const Register = lazy(() => import("../pages/Register")); */

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas base do sistema */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />

      {/* Rotas padrão do sistema */}
      <Route path="/register" element={<Register />} />

      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
