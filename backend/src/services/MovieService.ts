import { AppDataSource } from "../config/database.js";
import { Movie } from "../models/Movie.js";

export class MovieService {
  private movieRepository = AppDataSource.getRepository(Movie);

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find({
      where: { active: true }, // Só filmes ativos
      order: { id: "DESC" }, // Mais recentes primeiro
      select: [
        "id",
        "name",
        "originalName",
        "genre",
        "synopsis",
        "duration",
        "posterUrl",
      ], // Só campos necessários. A otimização tornará a consulta mais leve e mais ágil
    });
  }

  async create(movieData: Partial<Movie>) {
    const movie = this.movieRepository.create(movieData);
    return await this.movieRepository.save(movie);
  }

  async delete(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new Error("Movie not found");
    }
    await this.movieRepository.remove(movie);
    return movie;
  }

  async update(id: number, movieData: Partial<Movie>): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new Error("Movie not found");
    }
    await this.movieRepository.update(id, movieData);
    const updatedMovie = await this.movieRepository.findOneBy({ id });
    return updatedMovie!;
  }
}
