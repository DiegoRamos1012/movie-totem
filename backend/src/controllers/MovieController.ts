import type { Request, Response } from "express";
import { MovieService } from "../services/MovieService.js";

const movieService = new MovieService();

export class MovieController {
  /* Método que busca todos os filmes */
  static async getMovies(req: Request, res: Response) {
    const movies = await movieService.findAll();
    res.json(movies);
  }

  static async addMovie(req: Request, res: Response) {
    try {
      const newMovie = await movieService.create(req.body); // pega os dados do body
      return res.status(201).json(newMovie); // retorna a instância criada
    } catch (err) {
      return res.status(500).json({ message: "Erro ao criar filme", err });
    }
  }

  /* Método que deleta um filme */
  static async deleteMovie(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id ?? "");
      await movieService.deleteMovie(id);
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (err) {
      res.status(404).json({ message: "Error deleting movie:", err });
    }
  }

  /* Método que atualiza um filme */
  static async updateMovie(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id || "");
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid movie ID" });
      }

      // Chama o service e aguarda o resultado
      const updatedMovie = await movieService.updateMovie(id, req.body);

      return res.status(200).json({
        message: "Movie updated successfully",
        movie: updatedMovie,
      });
    } catch (err: any) {
      return res.status(500).json({
        message: "Error updating movie",
        error: err.message || err,
      });
    }
  }
}
