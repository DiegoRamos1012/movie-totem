import { AppDataSource } from "../config/database.js";
import { Movie } from "../models/Movie.js";

export class MovieService {
  private movieRepository = AppDataSource.getRepository(Movie);

  /* Busca todos os filmes ativos, ordenados do mais recente ao mais antigo */
  async findAll(): Promise<Movie[]> {
    const movies = await this.movieRepository.find({
      where: { active: true },
      order: { id: "DESC" },
      select: [
        "id",
        "name",
        "originalName",
        "genre",
        "synopsis",
        "duration",
        "posterUrl",
        "releaseDate",
        "rating",
      ],
    });

    console.log(`✅ ${movies.length} filmes ativos encontrados`);
    return movies;
  }

  /* Busca um filme específico por ID */
  async findById(id: number): Promise<Movie | null> {
    const movie = await this.movieRepository.findOne({
      where: { id },
    });

    if (!movie) {
      console.log(`⚠️ Filme com ID ${id} não encontrado`);
      return null;
    }

    console.log(`✅ Filme encontrado: ${movie.name}`);
    return movie;
  }

  /* Cria um novo filme no sistema */
  async create(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.movieRepository.create({
      ...movieData,
      active: movieData.active ?? true,
    });

    const savedMovie = await this.movieRepository.save(movie);
    console.log(
      `✅ Filme criado com sucesso: ${savedMovie.name} (ID: ${savedMovie.id})`
    );
    return savedMovie;
  }

  /* Atualiza os dados de um filme existente */
  async update(id: number, movieData: Partial<Movie>): Promise<Movie | null> {
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie) {
      console.log(`⚠️ Filme com ID ${id} não encontrado para atualização`);
      return null;
    }

    await this.movieRepository.update(id, movieData);

    const updatedMovie = await this.movieRepository.findOneBy({ id });
    console.log(`✅ Filme atualizado com sucesso: ${updatedMovie?.name}`);
    return updatedMovie;
  }

  /* Ativa um filme (torna visível no sistema) */
  async activate(id: number): Promise<boolean | "already_active"> {
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie) {
      console.log(`🔴 Filme com ID ${id} não encontrado para ativação`);
      return false;
    }

    if (movie.active) {
      console.log(`⚠️ Filme "${movie.name}" já está ativo`);
      return "already_active";
    }

    await this.movieRepository.update(id, { active: true });

    console.log(`🟢 Filme "${movie.name}" ativado com sucesso`);
    return true;
  }

  /* Desativa um filme (remove da visualização do sistema) */
  async deactivate(id: number): Promise<boolean | "already_inactive"> {
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie) {
      console.log(`🔴 Filme com ID ${id} não encontrado para desativação`);
      return false;
    }

    if (!movie.active) {
      console.log(`⚠️ Filme "${movie.name}" já está inativo`);
      return "already_inactive";
    }

    await this.movieRepository.update(id, { active: false });

    console.log(`🔴 Filme "${movie.name}" desativado com sucesso`);
    return true;
  }
}
