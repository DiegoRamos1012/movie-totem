import { Link } from "react-router-dom";

type Snack = { id: string; name: string; price: number; size?: string };

const mockSnacks: Snack[] = [
  { id: "n1", name: "Pipoca Grande", price: 12.5, size: "Grande" },
  { id: "n2", name: "Refrigerante 500ml", price: 8.0, size: "500ml" },
  { id: "n3", name: "Combo Pipoca + Refri", price: 18.0 },
];

export default function Snacks() {
  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Gerenciar Alimentos</h1>
        <Link
          to="/management/snacks/new"
          className="inline-block bg-primary text-white px-4 py-2 rounded-md text-sm"
        >
          Novo Item
        </Link>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockSnacks.map((s) => (
          <div key={s.id} className="p-4 border rounded bg-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-muted-foreground">
                  {s.size ?? "Padrão"}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">R$ {s.price.toFixed(2)}</div>
                <div className="flex gap-2 mt-2">
                  <Link
                    to={`/management/snacks/${s.id}/edit`}
                    className="text-sm text-muted-foreground"
                  >
                    Editar
                  </Link>
                  <button className="text-sm text-destructive">Remover</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
