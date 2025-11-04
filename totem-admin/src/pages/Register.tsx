import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User as UserIcon, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { isEmailValid, validatePassword } from "@/utils/validators";
import { toast } from "sonner";
import { registerUser } from "@/services/authService";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // normalize different error shapes into a single message
  function getErrorMessage(error: unknown): string {
    const defaultMsg = "Erro no cadastro";
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      if (data && typeof data === "object" && "message" in data) {
        const m = (data as Record<string, unknown>).message;
        if (typeof m === "string" && m.trim().length) return m;
      }
      return typeof error.message === "string" ? error.message : defaultMsg;
    }
    if (error instanceof Error) return error.message;
    const str = String(error);
    return str || defaultMsg;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errs: string[] = [];
    if (!name.trim()) errs.push("Nome é obrigatório.");
    if (!isEmailValid(email)) errs.push("Email inválido.");

    const pwRules = validatePassword(password);
    if (!pwRules.minLength)
      errs.push("Senha deve ter pelo menos 8 caracteres.");
    if (!pwRules.hasNumber) errs.push("Senha deve conter ao menos um número.");
    if (!pwRules.hasSpecialChar)
      errs.push("Senha deve conter ao menos um caractere especial.");

    if (errs.length) {
      toast.error(
        <div className="whitespace-pre-line">
          {errs.map((e) => `• ${e}`).join("\n")}
        </div>
      );
      return;
    }

    try {
      setLoading(true);
      const res = await registerUser({ name, email, password });
      toast.success(res?.data?.message ?? "Cadastro realizado com sucesso");
      navigate("/dashboard");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded transition-colors duration-200 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
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
