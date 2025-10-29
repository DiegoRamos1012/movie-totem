// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-blue-200 text-gray-800">
        <header className="bg-blue-700/60 shadow-md relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 font-bold text-lg">
            | Cinemania - Administração dos Totens
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end items-center h-16">
              <nav className="hidden sm:flex items-center space-x-4"></nav>
            </div>
          </div>
        </header>

        <main className="flex-1 py-10">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="py-6 text-center text-sm text-gray-500 mt-auto">
          <p> &copy; {new Date().getFullYear()} Totem Admin </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
