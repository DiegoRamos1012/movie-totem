import { AppDataSource } from "../config/database.js";
import { Movie } from "../models/Movie.js";
import { MovieAudit } from "../models/MovieAudit.js";

export class MovieService {
  private movieRepository = AppDataSource.getRepository(Movie);
  private auditRepository = AppDataSource.getRepository(MovieAudit);

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
  async update(
    id: number,
    movieData: Partial<Movie>,
    performedBy?: { id?: number; name?: string }
  ): Promise<Movie | null> {
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie) {
      console.log(`⚠️ Filme com ID ${id} não encontrado para atualização`);
      return null;
    }

    // detect movieStatus change
    const prevStatus = movie.movieStatus;

    await this.movieRepository.update(id, movieData);

    const updatedMovie = await this.movieRepository.findOneBy({ id });

    if (movieData.movieStatus && movieData.movieStatus !== prevStatus) {
      const audit = this.auditRepository.create({
        movieId: id,
        action: "status_change",
        previousValue: String(prevStatus),
        newValue: String(movieData.movieStatus),
        performedById: performedBy?.id,
        performedByName: performedBy?.name,
      });

      await this.auditRepository.save(audit);
      console.log(
        `📝 Audit registrado para mudança de status do filme ID ${id}`
      );
    }

    console.log(`✅ Filme atualizado com sucesso: ${updatedMovie?.name}`);
    return updatedMovie;
  }

  /* Ativa um filme (torna visível no sistema) */
  async activate(
    id: number,
    performedBy?: { id?: number; name?: string }
  ): Promise<boolean | "already_active"> {
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

    const audit = this.auditRepository.create({
      movieId: id,
      action: "activate",
      previousValue: String(movie.active),
      newValue: String(true),
      performedById: performedBy?.id,
      performedByName: performedBy?.name,
    });
    await this.auditRepository.save(audit);

    console.log(`🟢 Filme "${movie.name}" ativado com sucesso`);
    return true;
  }

  /* Desativa um filme (remove da visualização do sistema) */
  async deactivate(
    id: number,
    performedBy?: { id?: number; name?: string }
  ): Promise<boolean | "already_inactive"> {
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

    const audit = this.auditRepository.create({
      movieId: id,
      action: "deactivate",
      previousValue: String(movie.active),
      newValue: String(false),
      performedById: performedBy?.id,
      performedByName: performedBy?.name,
    });
    await this.auditRepository.save(audit);

    console.log(`🔴 Filme "${movie.name}" desativado com sucesso`);
    return true;
  }

  /** Soft-delete (marca active = false) e registra auditoria como 'delete' */
  async delete(
    id: number,
    performedBy?: { id?: number; name?: string }
  ): Promise<boolean> {
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie) return false;

    if (!movie.active) {
      // já inativo — ainda registramos o pedido de remoção
      const audit = this.auditRepository.create({
        movieId: id,
        action: "delete",
        previousValue: String(movie.active),
        newValue: String(false),
        performedById: performedBy?.id,
        performedByName: performedBy?.name,
      });
      await this.auditRepository.save(audit);
      return true;
    }

    await this.movieRepository.update(id, { active: false });

    const audit = this.auditRepository.create({
      movieId: id,
      action: "delete",
      previousValue: String(movie.active),
      newValue: String(false),
      performedById: performedBy?.id,
      performedByName: performedBy?.name,
    });
    await this.auditRepository.save(audit);

    return true;
  }
}
