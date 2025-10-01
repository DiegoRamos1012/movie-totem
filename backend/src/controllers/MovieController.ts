import type { Request, Response } from "express";
import { MovieService } from "../services/MovieService.js";

const movieService = new MovieService();

export class MovieController {
  /* Método que busca todos os filmes */
  static async getMovies(req: Request, res: Response) {
    try {
      const movies = await movieService.findAll();
      return res.status(200).json(movies);
    } catch (error: any) {
      console.error("Error fetching movies:", error);
      return res.status(500).json({
        message: "Error fetching movies",
        error: error.message,
      });
    }
  }

  static async addMovie(req: Request, res: Response) {
    try {
      // Validação básica
      if (!req.body.name || !req.body.duration) {
        return res.status(400).json({
          message: "Name and duration are required",
        });
      }

      const newMovie = await movieService.create(req.body);
      return res.status(201).json(newMovie);
    } catch (error: any) {
      console.error("Error creating movie:", error);
      return res.status(500).json({
        message: "Error creating movie",
        error: error.message,
      });
    }
  }

  /* Método que deleta um filme */
  static async deleteMovie(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id || "");

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid movie ID" });
      }

      const deleteResult = await movieService.deleteMovie(id);

      // Assuming deleteMovie returns a boolean or number of deleted rows
      if (deleteResult === null) {
        return res.status(404).json({ message: "Movie not found" });
      }

      return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error: any) {
      console.error("Error deleting movie:", error);
      return res.status(500).json({
        message: "Error deleting movie",
        error: error.message,
      });
    }
  }

  /* Método que atualiza um filme */
  static async updateMovie(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id || "");

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid movie ID" });
      }

      // Verificar se há dados para atualizar
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "No data provided for update" });
      }

      const updatedMovie = await movieService.updateMovie(id, req.body);

      if (!updatedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      return res.status(200).json({
        message: "Movie updated successfully",
        movie: updatedMovie,
      });
    } catch (error: any) {
      console.error("Error updating movie:", error);
      return res.status(500).json({
        message: "Error updating movie",
        error: error.message,
      });
    }
  }
}
