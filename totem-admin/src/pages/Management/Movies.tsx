import { Link } from "react-router-dom";

type Movie = {
  id: string;
  title: string;
  year: number;
  duration: number; // minutes
  rating: string;
};

const mockMovies: Movie[] = [
  {
    id: "1",
    title: "A Grande Aventura",
    year: 2023,
    duration: 115,
    rating: "PG-13",
  },
  {
    id: "2",
    title: "Noite de Mistério",
    year: 2024,
    duration: 98,
    rating: "R",
  },
  {
    id: "3",
    title: "Comédia do Bairro",
    year: 2022,
    duration: 105,
    rating: "PG",
  },
];

export default function Movies() {
  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Gerenciar Filmes</h1>
        <Link
          to="/management/movies/new"
          className="inline-block bg-primary text-white px-4 py-2 rounded-md text-sm"
        >
          Novo Filme
        </Link>
      </header>

      <section className="bg-card p-4 rounded-md shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-muted-foreground">
              <th className="pb-2">Título</th>
              <th className="pb-2">Ano</th>
              <th className="pb-2">Duração</th>
              <th className="pb-2">Class.</th>
              <th className="pb-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {mockMovies.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="py-3">{m.title}</td>
                <td className="py-3">{m.year}</td>
                <td className="py-3">{m.duration} min</td>
                <td className="py-3">{m.rating}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <Link
                      to={`/management/movies/${m.id}`}
                      className="text-sm text-primary"
                    >
                      Ver
                    </Link>
                    <Link
                      to={`/management/movies/${m.id}/edit`}
                      className="text-sm text-muted-foreground"
                    >
                      Editar
                    </Link>
                    <button className="text-sm text-destructive">
                      Remover
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
