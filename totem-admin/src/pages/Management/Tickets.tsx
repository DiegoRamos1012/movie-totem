import { useMemo, useState } from "react";

type Ticket = {
  id: string;
  code: string;
  movie: string;
  seat: string;
  status: "paid" | "reserved" | "cancelled";
};

const mockTickets: Ticket[] = [
  {
    id: "tk1",
    code: "ABC123",
    movie: "A Grande Aventura",
    seat: "A1",
    status: "paid",
  },
  {
    id: "tk2",
    code: "XYZ789",
    movie: "Noite de Mistério",
    seat: "B5",
    status: "reserved",
  },
  {
    id: "tk3",
    code: "LMN456",
    movie: "Comédia do Bairro",
    seat: "C3",
    status: "cancelled",
  },
];

export default function Tickets() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query) return mockTickets;
    return mockTickets.filter((t) => t.code.includes(query.toUpperCase()));
  }, [query]);

  return (
    <div className="p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Gerenciar Ingressos</h1>
      </header>

      <div className="mb-4 flex gap-2 items-center">
        <input
          placeholder="Buscar por código (ex: ABC123)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={() => setQuery("")}
          className="text-sm text-muted-foreground"
        >
          Limpar
        </button>
      </div>

      <section className="bg-card p-4 rounded-md">
        <ul className="divide-y">
          {results.map((t) => (
            <li key={t.id} className="py-3 flex justify-between items-center">
              <div>
                <div className="font-medium">
                  {t.code} — {t.movie}
                </div>
                <div className="text-sm text-muted-foreground">
                  Assento: {t.seat}
                </div>
              </div>
              <div
                className={`text-sm ${
                  t.status === "paid"
                    ? "text-green-600"
                    : t.status === "reserved"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {t.status}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
