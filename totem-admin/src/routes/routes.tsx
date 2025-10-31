import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import Login from "@/pages/Login";
import Register from "../pages/Register";

const Dashboard = lazy(() => import("../pages/Dashboard"));


/* Aplique Lazy a todas as páginas, exceto nas páginas Login e Register, por serem as páginas iniciais
Lazy de exemplo: const Dashboard = lazy(() => import("../pages/Dashboard")); */

export default function AppRoutes() {
  return (
    <Routes>  
      {/* Rotas base do sistema */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />

      {/* Rotas padrão do sistema */}
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
