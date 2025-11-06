import { useState } from "react";
import { Link } from "react-router-dom";

type Screening = {
  id: string;
  movie: string;
  theater: string;
  startsAt: string; // ISO
  seatsAvailable: number;
};

const mockScreenings: Screening[] = [
  {
    id: "s1",
    movie: "A Grande Aventura",
    theater: "Sala 1",
    startsAt: "2025-11-07T19:30:00",
    seatsAvailable: 24,
  },
  {
    id: "s2",
    movie: "Noite de Mistério",
    theater: "Sala 2",
    startsAt: "2025-11-07T21:00:00",
    seatsAvailable: 0,
  },
  {
    id: "s3",
    movie: "Comédia do Bairro",
    theater: "Sala 3",
    startsAt: "2025-11-08T18:00:00",
    seatsAvailable: 50,
  },
];

export default function Screenings() {
  const [dateFilter, setDateFilter] = useState("");

  const filtered = dateFilter
    ? mockScreenings.filter((s) => s.startsAt.startsWith(dateFilter))
    : mockScreenings;

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Gerenciar Sessões</h1>
        <Link
          to="/management/screenings/new"
          className="inline-block bg-primary text-white px-4 py-2 rounded-md text-sm"
        >
          Nova Sessão
        </Link>
      </header>

      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm">Filtrar por data</label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={() => setDateFilter("")}
          className="text-sm text-muted-foreground"
        >
          Limpar
        </button>
      </div>

      <section className="bg-card p-4 rounded-md shadow-sm">
        <ul className="space-y-3">
          {filtered.map((s) => (
            <li
              key={s.id}
              className="p-3 border rounded flex justify-between items-center"
            >
              <div>
                <div className="font-medium">
                  {s.movie} — {s.theater}
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(s.startsAt).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm">{s.seatsAvailable} disponíveis</div>
                <Link
                  to={`/management/screenings/${s.id}`}
                  className="text-primary text-sm"
                >
                  Ver
                </Link>
                <button className="text-destructive text-sm">Cancelar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
