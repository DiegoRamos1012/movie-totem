"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Profile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState<string>(() => String(user?.name ?? ""));
  const [email, setEmail] = useState<string>(() => String(user?.email ?? ""));

  const handleSave = () => {
    // Provisório: atualiza somente o estado local.
    setEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Perfil</h1>

        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-600">
            {(
              (name || String(user?.name) || "Usuário").charAt(0) || "U"
            ).toUpperCase()}
          </div>

          <div className="flex-1">
            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <Input
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    E-mail
                  </label>
                  <Input
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="text-lg font-medium">
                  {name || String(user?.name) || "Usuário"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {email || String(user?.email) || "-"}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Papel: {String(user?.role ?? "Administrador")}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {editing ? (
              <>
                <Button
                  onClick={handleSave}
                  className="bg-indigo-600 text-white"
                >
                  Salvar
                </Button>
                <Button variant="ghost" onClick={() => setEditing(false)}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>Editar</Button>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Conteúdo provisório — substitua por um formulário real de perfil
          quando necessário.
        </p>
      </div>
    </div>
  );
}
