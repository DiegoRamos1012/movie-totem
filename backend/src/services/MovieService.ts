import { AppDataSource } from "../config/database.js";
import { Movie } from "../models/Movie.js";

export class MovieService {
  update(id: number, body: any) {
    throw new Error("Method not implemented.");
  }
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

  async updateMovie(id: number, movieData: Partial<Movie>) { // recebe como parâmetros o id do filme e atributos opcionais do Filme
    const movie = await this.movieRepository.findOneBy({ id }); // Através do ID, ele busca o filme atrelado a ele
    if (!movie) {
      throw new Error(`Movie with ID ${id} not found`);
    }
    const updatedMovie = this.movieRepository.merge(movie, movieData); // Mescla os novos dados com os antigos
    return await this.movieRepository.save(updatedMovie); // Recebe os dados mesclados pra atualizar o filme
  }
}
