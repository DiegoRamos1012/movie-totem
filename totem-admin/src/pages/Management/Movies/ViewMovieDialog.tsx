import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatters";
import {
  type Movie,
  MovieRating,
  MovieStatusLabel,
} from "../../../../types/types";

type ViewMovieDialogProps = {
  open: boolean;
  movie?: Movie | null;
  onClose?: () => void;
};

function ratingLabel(r: MovieRating) {
  return r === MovieRating.LIVRE ? "Livre" : `${r}+`;
}

export default function ViewMovieDialog({ open, movie, onClose }: ViewMovieDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(state) => !state && onClose?.()}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-semibold">
            {movie?.name ?? "Detalhes do Filme"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-2 flex flex-col md:flex-row gap-6">
          {movie ? (
            <>
              <img
                src={movie.posterUrl.replace("/60?", "/600?")}
                alt={`${movie.name} poster`}
                className="w-full md:w-56 rounded-lg shadow-sm object-cover"
              />

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Título original:</span>{" "}
                  {movie.originalName}
                </p>
                <p>
                  <span className="font-semibold">Gênero:</span> {movie.genre}
                </p>
                <p>
                  <span className="font-semibold">Duração:</span>{" "}
                  {movie.duration} min
                </p>
                <p>
                  <span className="font-semibold">Classificação:</span>{" "}
                  {ratingLabel(movie.rating)}
                </p>
                <p>
                  <span className="font-semibold">Lançamento:</span>{" "}
                  {formatDate(movie.releaseDate)}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {MovieStatusLabel[movie.movieStatus]}
                </p>
                <p>
                  <span className="font-semibold">Ativo:</span>{" "}
                  {movie.active ? "Sim" : "Não"}
                </p>
                <p>
                  <span className="font-semibold">Direção:</span>{" "}
                  {movie.direction}
                </p>
                <p>
                  <span className="font-semibold">Elenco:</span>{" "}
                  {movie.casting}
                </p>
                <p className="pt-2 text-muted-foreground">{movie.synopsis}</p>
              </div>
            </>
          ) : (
            <p>Sem dados para exibir.</p>
          )}
        </div>

        <DialogFooter className="p-6 pt-0">
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
