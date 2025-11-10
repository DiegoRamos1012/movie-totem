// src/App.tsx
import { BrowserRouter, Link } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { LogOut, User, Menu } from "lucide-react";
import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "./components/ui/navbar";
import useAuth from "@/hooks/useAuth";

export default function App() {
  // Header visível apenas para usuários autenticados
  const AuthHeader = () => {
    const { user, logout } = useAuth();
    if (!user) return null;
    return (
      <div className="hidden md:flex absolute right-0 top-0 h-full items-center pr-4 gap-3">
        <Link to="/profile">
          <Button
            variant="ghost"
            className="text-white flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">
              {user?.name ? String(user.name) : "Perfil"}
            </span>
          </Button>
        </Link>

        <Button
          variant={"ghost"}
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          className=" text-white font-medium px-3 py-2 rounded flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    );
  };

  const AuthNavbar = () => {
    const { user } = useAuth();
    if (!user) return null;

    return (
      <div className="hidden md:flex absolute inset-x-0 top-0 h-full justify-center items-center">
        <Navbar />
      </div>
    );
  };

  const MobileMenu = () => {
    const { user, logout } = useAuth();
    const items = [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/movies", label: "Filmes" },
      { to: "/screenings", label: "Sessões" },
      { to: "/theaters", label: "Salas" },
      { to: "/tickets", label: "Ingressos" },
      { to: "/snacks", label: "Alimentos" },
      { to: "/admin", label: "Administração" },
    ];

    if (!user) return null;

    return (
      <div className="md:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="p-2 text-white">
              <Menu />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <nav className="flex flex-col gap-3">
              {items.map((it) => (
                <Link key={it.to} to={it.to} className="text-base font-medium">
                  {it.label}
                </Link>
              ))}

              <hr className="my-2" />

              <Link to="/profile" className="text-base font-medium">
                Perfil
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  logout();
                  window.location.href = "/login";
                }}
              >
                Sair
              </Button>
            </nav>
          </DialogContent>
        </Dialog>
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
            {/* Logotipo/Título à esquerda (mobile includes menu) */}
            <div className="absolute left-0 top-0 h-full flex items-center pl-4 gap-3">
              <div className="md:hidden">
                <MobileMenu />
              </div>

              <span
                aria-hidden
                className="inline-block w-1 h-6 bg-white/20 mr-1 rounded-sm"
              />
              <span className="text-white font-bold text-sm md:text-lg">
                Cinemania - Administração dos Totens
              </span>
            </div>

            {/* Navbar central */}
            <AuthNavbar />

            {/* Botão de Logout à direita */}
            <AuthHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center h-16"></div>
            </div>
          </header>

          <main className="flex-1 py-10">
            <Suspense fallback={<div className="flex justify-center">Carregando...</div>}>
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
