import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Simulando login com", { email, password });
    navigate("/");
  }

  return (
    <div className="w-full max-w-md mx-auto mt-20 sm:mt-25 px-5">
      <div className="bg-white rounded-lg shadow-md p-5 sm:p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
          Entrar
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Acesse o painel de administração inserindo suas credenciais
        </p>
        

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Email</FieldLegend>
                <Field>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-blue-400"
                      aria-hidden="true"
                    />
                    <input
                      className="w-full pl-10 px-3 py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
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

              <FieldSet>
                <FieldLegend>Senha</FieldLegend>
                <Field>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-blue-400"
                      aria-hidden="true"
                    />
                    <input
                      className="w-full pl-10 pr-12 px-3 py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />

                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-150"
                    >
                      {showPassword ? (
                        <Eye
                          className="h-5 w-5  text-blue-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <EyeOff
                          className="h-5 w-5  text-blue-500"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </div>
                </Field>
              </FieldSet>
            </FieldGroup>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-1 gap-2">
              <button
                type="button"
                className="text-indigo-600 font-bold hover:underline ml-auto"
                onClick={() => {
                  /* abrir reset de senha ou navegação */
                }}
              >
                Esqueci a senha
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Entrar
              </button>
            </div>
            <div className="text-center">
              <Link
                to="/register"
                className="text-indigo-600 font-bold cursor-pointer hover:underline hover:text-indigo-800 transition-colors duration-200"
              >
                Não tem conta? Clique aqui para se cadastrar
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
