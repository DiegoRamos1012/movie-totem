import { AppDataSource } from "../config/database.js";
import { Movie } from "../models/Movie.js";

export class MovieService {
  private movieRepository = AppDataSource.getRepository(Movie);

  async findAll() {
    return await this.movieRepository.find();
  }

  async create(movieData: Partial<Movie>) {
    const movie = this.movieRepository.create(movieData);
    return await this.movieRepository.save(movie);
  }

  async deleteMovie(id: number): Promise<void> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new Error("Movie not found");
    }

    await this.movieRepository.remove(movie);
  }
}
