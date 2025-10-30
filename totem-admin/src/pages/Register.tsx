import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User as UserIcon, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // aqui você chamaria a API de cadastro
    console.log("Cadastrar:", { name, email, password, remember });
    navigate("/login");
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
        Criar conta
      </h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Preencha os dados para criar sua conta
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <UserIcon className="h-4 w-4 text-indigo-600" aria-hidden="true" />
            Nome
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Mail className="h-4 w-4 text-indigo-600" aria-hidden="true" />
            E-mail
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@exemplo.com"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Lock className="h-4 w-4 text-indigo-600" aria-hidden="true" />
            Senha
          </label>
          <div className="relative">
            <input
              className="w-full pr-10 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 text-indigo-600 rounded border-gray-300"
            />
            <span className="ml-2 select-none">Lembrar-me</span>
          </label>

          <button
            type="button"
            className="text-indigo-600 font-bold hover:underline"
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
      </form>
    </div>
  );
};

export default Register;
