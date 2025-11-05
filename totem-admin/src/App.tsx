// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { Suspense, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { LogOut } from "lucide-react";
import { Button } from "./components/ui/button";

export default function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") setAuthenticated(Boolean(e.newValue));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-blue-200 text-gray-800">
        {/* ✅ Toaster estilizado (Sonner) */}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            className:
              "rounded-lg shadow-md border border-gray-200 bg-white text-gray-800 px-4 py-3 font-medium text-sm",
            duration: 3500,
          }}
        />

        <header className="bg-blue-700/60 shadow-md relative">
          <div className="absolute left-0 top-0 h-full flex items-center pl-4">
            <span
              aria-hidden="true"
              className="inline-block w-1 h-6 bg-white/20 mr-3 rounded-sm"
            />
            <span className="text-white font-bold text-lg sm:text-base">
              Cinemania - Administração dos Totens
            </span>
          </div>

          {/* botão Sair alinhado à direita */}
          {authenticated && (
            <div className="absolute right-0 top-0 h-full flex items-center pr-4">
              <Button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-800 text-white font-medium px-5 py-2 rounded flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" aria-hidden="true" />
                <span>Sair</span>
              </Button>
            </div>
          )}

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
          <p>&copy; {new Date().getFullYear()} Cinemania - Github: Diego1012</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
