import { Link } from "react-router-dom";

type Theater = { id: string; name: string; capacity: number; active: boolean };

const mockTheaters: Theater[] = [
  { id: "t1", name: "Sala 1", capacity: 120, active: true },
  { id: "t2", name: "Sala 2", capacity: 80, active: true },
  { id: "t3", name: "Sala 4 (IMAX)", capacity: 220, active: false },
];

export default function Theaters() {
  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Gerenciar Salas</h1>
        <Link
          to="/management/theaters/new"
          className="inline-block bg-primary text-white px-4 py-2 rounded-md text-sm"
        >
          Nova Sala
        </Link>
      </header>

      <section className="bg-card p-4 rounded-md shadow-sm">
        <ul className="divide-y">
          {mockTheaters.map((t) => (
            <li key={t.id} className="py-3 flex justify-between items-center">
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-sm text-muted-foreground">
                  Capacidade: {t.capacity}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`text-sm ${
                    t.active ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.active ? "Ativa" : "Inativa"}
                </div>
                <Link
                  to={`/management/theaters/${t.id}/edit`}
                  className="text-sm text-muted-foreground"
                >
                  Editar
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
