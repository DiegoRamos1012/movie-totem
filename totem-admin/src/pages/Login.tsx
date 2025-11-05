import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authUser } from "@/services/authService";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldGroup, FieldSet, FieldLabel } from "@/components/ui/field";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, token } = await authUser({ email, password });

      if (user && token) {
        toast.success(`Bem-vindo de volta, ${user.name}!`);

        // Armazena token e dados do usuário
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard");
      } else {
        toast.error("Erro ao autenticar. Resposta inválida do servidor.");
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Erro ao autenticar. Tente novamente."
        );
      } else {
        toast.error("Erro ao autenticar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-25 px-5">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-3 text-center">
          Entrar
        </h1>
        <p className="text-muted-foreground text-center text-sm mb-3">
          Insira seus dados para entrar no sistema
        </p>

        <form onSubmit={handleSubmit} className="space-y-7">
          <FieldGroup>
            {/* Campo de Email */}
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
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="seu@exemplo.com"
                  />
                </div>
              </Field>
            </FieldSet>

            {/* Campo de Senha */}
            <FieldSet>
              <div className="flex items-center justify-between">
                <FieldLabel className="text-base">Senha</FieldLabel>
                <a
                  href="/"
                  className="text-sm font-semibold text-indigo-600 hover:underline underline-offset-4"
                >
                  Esqueceu sua senha?
                </a>
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
                    name="password"
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

          {/* Botão de Enviar */}
          <Button
            size="lg"
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded transition-colors duration-200 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
          >
            {loading && <Spinner className="mr-2 h-4 w-4" aria-hidden="true" />}
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          {/* Link de Cadastro */}
          <p className="text-center font-semibold text-sm text-gray-600">
            Não possui uma conta?{" "}
            <a
              href="/register"
              className="text-indigo-600 hover:underline underline-offset-4"
            >
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
