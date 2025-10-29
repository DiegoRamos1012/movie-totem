import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Mail } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Entrar
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Acesse o painel de administração inserindo suas credenciais
      </p>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Email</FieldLegend>
            <Field>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400"
                  aria-hidden="true"
                />
                <input
                  className="w-full pl-10 px-3 py-2 border rounded focus:outline-none focus:ring"
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
              {/* wrapper relative para posicionar o botão no final do input */}
              <div className="relative">
                <input
                  className="w-full pr-10 px-3 py-2 border rounded focus:outline-none focus:ring"
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
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </Field>
          </FieldSet>
        </FieldGroup>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
