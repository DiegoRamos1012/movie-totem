import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User as UserIcon, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // aqui você chamaria a API de cadastro
    console.log("Cadastrar:", { name, email, password });
    navigate("/login");
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
        Cadastro
      </h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Preencha os dados para criar sua conta
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <div className="relative">
            <UserIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400"
              aria-hidden="true"
            />
            <input
              className="w-full pl-10 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Seu nome"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400"
              aria-hidden="true"
            />
            <input
              className="w-full pl-10 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@exemplo.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400"
              aria-hidden="true"
            />
            <input
              className="w-full pr-10 pl-10 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-150"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-1 gap-2">
          <button
            type="button"
            className="text-indigo-600 font-bold hover:underline ml-auto"
            onClick={() => navigate("/login")}
          >
            Esqueci a senha
          </button>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded transition-colors duration-200 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Registrar
          </button>
        </div>
        <div className="text-center">
          <Link
            to="/login"
            className="text-indigo-600 font-bold cursor-pointer hover:underline hover:text-indigo-800 transition-colors duration-200"
          >
            Voltar pra Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
