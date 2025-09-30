import type { Request, Response } from "express";
import { MovieService } from "../services/MovieService.js";

const movieService = new MovieService();

export class MovieController {
  /* Método que busca todos os filmes */
  static async getMovies(req: Request, res: Response) {
    const movies = await movieService.findAll();
    res.json(movies);
  }

  /* Método que deleta um filme */
  static async deleteMovie(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id ?? "");
      await movieService.deleteMovie(id);
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
