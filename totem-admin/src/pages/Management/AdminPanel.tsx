import { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Role = "FUNCIONARIO" | "GERENTE" | "ADMIN";

// frontend
const roleLabels = {
  FUNCIONARIO: "Funcionário",
  GERENTE: "Gerente",
  ADMIN: "Administrador",
} as const;

type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  active: boolean;
};

const initialUsers: User[] = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana@example.com",
    role: "FUNCIONARIO",
    active: true,
  },
  {
    id: 2,
    name: "Bruno Costa",
    email: "bruno@example.com",
    role: "GERENTE",
    active: true,
  },
  {
    id: 3,
    name: "Carla Souza",
    email: "carla@example.com",
    role: "ADMIN",
    active: true,
  },
  {
    id: 4,
    name: "Diego Ramos",
    email: "diego@example.com",
    role: "FUNCIONARIO",
    active: false,
  },
];

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [proposedRole, setProposedRole] = useState<Role | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  function openDialogFor(u: User) {
    setSelected(u);
    setProposedRole(u.role);
    setOpen(true);
  }

  function applyRoleChange() {
    if (!selected || !proposedRole) return;
    setUsers((list) =>
      list.map((u) => (u.id === selected.id ? { ...u, role: proposedRole } : u))
    );
    setOpen(false);
    setSelected(null);
  }

  function toggleActive(u: User) {
    setUsers((list) =>
      list.map((it) => (it.id === u.id ? { ...it, active: !it.active } : it))
    );
  }

  // UI rules summary (enforced on client only):
  // - FUNCIONARIO: ver/editar tudo exceto alterar preços (no price controls here)
  // - GERENTE: tudo do funcionario + alterar preços + soft/hard delete
  // - ADMIN: tudo do GERENTE

  return (
    <div className="p-5">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Controle de usuários</h1>
      </header>

      <section className="bg-card p-4 rounded-md shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <Input
            placeholder="Buscar por nome ou email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/3"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUsers(initialUsers)}
            >
              Resetar dados mockados
            </Button>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                      <UserIcon size={16} />
                    </div>
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs text-muted-foreground">
                        ID: {u.id}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{roleLabels[u.role]}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs ${
                        u.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {u.active ? "Ativo" : "Inativo"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <Button size="sm" onClick={() => openDialogFor(u)}>
                        Alterar Cargo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleActive(u)}
                      >
                        {u.active ? "Desativar" : "Ativar"}
                      </Button>
                      {/* soft/hard delete UI only available to GERENTE+ should be guarded in backend */}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          setUsers((list) =>
                            list.filter((it) => it.id !== u.id)
                          )
                        }
                      >
                        Excluir (hard)
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {filtered.map((u) => (
            <div
              key={u.id}
              className="p-3 bg-background border rounded-md flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <UserIcon size={18} />
                </div>
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                  <div className="text-xs mt-1">
                    Cargo: {roleLabels[u.role]} •{" "}
                    {u.active ? "Ativo" : "Inativo"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Button size="sm" onClick={() => openDialogFor(u)}>
                  Cargo
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleActive(u)}
                >
                  {u.active ? "Desativar" : "Ativar"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Alterar cargo do usuário</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <div className="text-sm">
                {selected ? (
                  <>
                    <div className="font-medium">{selected.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {selected.email}
                    </div>
                  </>
                ) : null}
              </div>

              <select
                value={proposedRole ?? ""}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setProposedRole(e.target.value as Role)
                }
                className="w-full border px-3 py-2 rounded"
                aria-label="Selecionar cargo"
              >
                <option value="">Selecione</option>
                <option value="FUNCIONARIO">Funcionário</option>
                <option value="GERENTE">Gerente</option>
                <option value="ADMIN">Administrador</option>
              </select>

              <div className="text-xs text-muted-foreground">
                Regras (cliente): Funcionário não pode alterar preços. Gerente
                pode alterar preços e excluir soft/hard. Administrador tem todas
                as permissões do gerente.
              </div>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={applyRoleChange}>Aplicar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}
