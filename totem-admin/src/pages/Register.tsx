import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User as UserIcon, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { validatePassword, validateEmailAsync } from "@/utils/validators";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/services/authService";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldGroup, FieldSet, FieldLabel } from "@/components/ui/field";

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
    const emailRules = await validateEmailAsync(email);
    if (!emailRules.hasAt || !emailRules.endsWithCom)
      errs.push("Email inválido.");
    if (emailRules.exists) errs.push("Email já cadastrado.");

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
    <div className="w-full max-w-md mx-auto mt-20 px-5">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
          Cadastro
        </h1>
        <p className="text-center text-sm text-gray-500 mb-5">
          Preencha os dados para criar sua conta
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FieldGroup>
            <FieldSet>
              <FieldLabel className="text-base">Nome</FieldLabel>
              <Field>
                <div className="relative">
                  <UserIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 pointer-events-none"
                    aria-hidden="true"
                  />
                  <Input
                    className="pl-10"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Seu nome"
                  />
                </div>
              </Field>
            </FieldSet>

            <FieldSet>
              <FieldLabel className="text-base">E-mail</FieldLabel>
              <Field>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 pointer-events-none"
                    aria-hidden="true"
                  />
                  <Input
                    className="pl-10"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="seu@exemplo.com"
                  />
                </div>
              </Field>
            </FieldSet>

            <FieldSet>
              <div>
                <FieldLabel className="text-base">Senha</FieldLabel>
              </div>
              <Field>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 pointer-events-none"
                    aria-hidden="true"
                  />
                  <Input
                    className="pl-10 pr-12"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-transparent focus-visible:bg-transparent active:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-blue-500" />
                    )}
                  </Button>
                </div>
              </Field>
            </FieldSet>
          </FieldGroup>

          <Button
            size="lg"
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded transition-colors duration-200 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
          >
            {loading && <Spinner className="mr-2 h-4 w-4" aria-hidden="true" />}
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <p className="text-center font-semibold text-sm text-gray-600">
            Já possui uma conta?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline underline-offset-4"
            >
              Voltar pra Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
