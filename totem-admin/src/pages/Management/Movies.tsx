import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { MovieRating } from "../../../types/types";
import { mockMovies } from "@/mockedData/mockedMovies";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

function ratingLabel(r: MovieRating) {
  return r === MovieRating.LIVRE ? "Livre" : `${r}+`;
}

type SortField =
  | "name"
  | "year"
  | "duration"
  | "rating"
  | "releaseDate"
  | "active"
  | null;

export default function Movies() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const getValue = (
    m: (typeof mockMovies)[number],
    field: Exclude<SortField, null>
  ) => {
    switch (field) {
      case "name":
        return m.name.toLowerCase();
      case "year":
        // sort by full timestamp when sorting by release date
        return m.releaseDate.getTime();
      case "duration":
        return m.duration;
      case "rating":
        return m.rating;
      case "active":
        return m.active;
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = mockMovies.filter((m) => m.name.toLowerCase().includes(q));

    if (!sortField) return base;

    return base.slice().sort((a, b) => {
      const va = getValue(a, sortField as Exclude<SortField, null>);
      const vb = getValue(b, sortField as Exclude<SortField, null>);

      if (typeof va === "string" && typeof vb === "string") {
        return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      }

      return sortDir === "asc"
        ? Number(va) - Number(vb)
        : Number(vb) - Number(va);
    });
  }, [query, sortField, sortDir]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const toggleSort = (field: Exclude<SortField, null>) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="p-5">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Gerenciamento de Filmes</h1>
        <Link
          to="/management/movies/new"
          className="inline-block bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded-md text-sm"
        >
          Novo Filme
        </Link>
      </header>

      <section className="bg-card p-4 rounded-md shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Input
            aria-label="Buscar filmes"
            placeholder="Buscar por título..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border rounded-md w-1/2"
          />

          <div className="flex items-center gap-2">
            <label className="text-sm">Exibir</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="px-2 py-1 border rounded-md"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="flex items-center gap-2">Pôster</TableHead>
              <TableHead>
                <button
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-2"
                >
                  Título
                  {sortField === "name" && (sortDir === "asc" ? " ▲" : " ▼")}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => toggleSort("year")}
                  className="flex items-center gap-2"
                >
                  Data de Lançamento
                  {sortField === "year" && (sortDir === "asc" ? " ▲" : " ▼")}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => toggleSort("duration")}
                  className="flex items-center gap-2"
                >
                  Duração
                  {sortField === "duration" &&
                    (sortDir === "asc" ? " ▲" : " ▼")}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => toggleSort("rating")}
                  className="flex items-center gap-2"
                >
                  Class.
                  {sortField === "rating" && (sortDir === "asc" ? " ▲" : " ▼")}
                </button>
              </TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageData.map((m) => (
              <TableRow key={m.id}>
                <TableCell>
                  <img
                    src={m.posterUrl}
                    alt={`${m.name} poster`}
                    className="w-12 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.releaseDate.toLocaleDateString()}</TableCell>
                <TableCell>{m.duration} min</TableCell>
                <TableCell>{ratingLabel(m.rating)}</TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {pageData.length} de {total} filmes
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Anterior
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1 ? "bg-primary text-white" : "border"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
