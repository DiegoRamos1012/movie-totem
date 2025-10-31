// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { Suspense } from "react";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-blue-200 text-gray-800">
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end items-center h-16"></div>
          </div>
        </header>

        <main className="flex-1 py-10">
            <Suspense fallback={<div>Carregando...</div>}>
              <AppRoutes />
            </Suspense>
        </main>

        <footer className="py-6 text-center text-sm text-gray-500 mt-auto">
          <p>&copy; {new Date().getFullYear()} Cinemania</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
