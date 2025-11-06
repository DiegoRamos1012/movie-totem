// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { LogOut } from "lucide-react";
import { Button } from "./components/ui/button";
import { AuthProvider } from "@/contexts/AuthContext";
import useAuth from "@/hooks/useAuth";
import { Navbar } from "./components/ui/navbar";
import Profile from "./pages/Management/Profile";

export default function App() {
  // Header visível apenas para usuários autenticados
  const AuthHeader = () => {
    const { user, logout } = useAuth();
    if (!user) return null;

    return (
      <div className="absolute right-0 top-0 h-full flex items-center pr-4">
        <Button
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          className="bg-blue-600 hover:bg-blue-800 text-white font-medium px-5 py-2 rounded flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
          <span>Sair</span>
        </Button>
      </div>
    );
  };

  // Navbar centralizada e exibida apenas se autenticado
  const AuthNavbar = () => {
    const { user } = useAuth();
    if (!user) return null;

    return (
      <div className="absolute inset-x-0 top-0 h-full flex justify-center items-center">
        <Navbar />
      </div>
    );
  };

  const AuthProfile = () => {
    const { user } = useAuth();
    if (!user) return null;

    return (
      <div className="absolute inset-x-0 top-0 h-full flex justify-center items-center">
        <Profile />
      </div>
    );
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-blue-200 text-gray-800">
          {/* ✅ Toaster (Sonner) */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={5000}
            toastOptions={{
              className:
                "rounded-lg shadow-md border border-gray-200 bg-white text-gray-800 px-4 py-3 font-medium text-sm",
            }}
          />

          <header className="bg-blue-700/60 shadow-md relative">
            {/* Logotipo/Título à esquerda */}
            <div className="absolute left-0 top-0 h-full flex items-center pl-4">
              <span
                aria-hidden="true"
                className="inline-block w-1 h-6 bg-white/20 mr-3 rounded-sm"
              />
              <span className="text-white font-bold text-lg sm:text-base">
                Cinemania - Administração dos Totens
              </span>
            </div>

            {/* Navbar central */}
            <AuthNavbar />

            <AuthProfile />

            {/* Botão de Logout à direita */}
            <AuthHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center h-16"></div>
            </div>
          </header>

          <main className="flex-1 py-10">
            <Suspense fallback={<div>Carregando...</div>}>
              <AppRoutes />
            </Suspense>
          </main>

          <footer className="py-6 text-center text-sm text-gray-500 mt-auto">
            <p>
              &copy; {new Date().getFullYear()} Cinemania — Github: Diego1012
            </p>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
