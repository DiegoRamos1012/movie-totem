import { AppDataSource } from "../config/database.js";
import { Screening } from "../models/Screening.js";

export class ScreeningService {
  private screeningRepository = AppDataSource.getRepository(Screening);

  /* Busca todas as sessões ativas em ordem crescente de data e horário */
  async findAll(): Promise<Screening[]> {
    const screenings = await this.screeningRepository.find({
      where: { active: true },
      relations: ["movie", "theater"],
      order: {
        screeningDate: "ASC",
        startTime: "ASC",
      },
    });

    console.log(`✅ ${screenings.length} sessões ativas encontradas`);
    return screenings;
  }

  /* Busca uma sessão específica por ID */
  async findById(id: number): Promise<Screening | null> {
    const screening = await this.screeningRepository.findOne({
      where: { id },
      relations: ["movie", "theater"],
    });

    if (!screening) {
      console.log(`⚠️ Sessão com ID ${id} não encontrada`);
      return null;
    }

    console.log(
      `✅ Sessão encontrada: ${screening.movie?.name} - ${screening.screeningDate} às ${screening.startTime}`
    );
    return screening;
  }

  /* Busca sessões de um filme específico - OTIMIZADO */
  async findByMovie(movieId: number): Promise<Screening[]> {
    return await this.screeningRepository
      .createQueryBuilder("screening")
      .select([
        "screening.id",
        "screening.movieId",
        "screening.theaterId",
        "screening.screeningDate",
        "screening.startTime",
        "screening.availableSeats",
        "screening.basePrice",
        "screening.active",
        // Apenas campos necessários do filme
        "movie.id",
        "movie.name",
        "movie.duration",
        "movie.posterUrl",
        // Apenas campos necessários da sala
        "theater.id",
        "theater.name",
        "theater.capacity",
      ])
      .leftJoin("screening.movie", "movie")
      .leftJoin("screening.theater", "theater")
      .where("screening.movieId = :movieId", { movieId })
      .andWhere("screening.active = :active", { active: true })
      .orderBy("screening.screeningDate", "ASC")
      .addOrderBy("screening.startTime", "ASC")
      .getMany();
  }

  /* Cria uma nova sessão de filme */
  async create(screeningData: Partial<Screening>): Promise<Screening> {
    // Validar campos obrigatórios
    this.validateRequiredFields(screeningData);

    // Validar conflito de horário na sala
    await this.validateTimeConflict(
      screeningData.theaterId!,
      screeningData.screeningDate!,
      screeningData.startTime!
    );

    const newScreening = this.screeningRepository.create({
      ...screeningData,
      active: screeningData.active ?? true,
    });

    const savedScreening = await this.screeningRepository.save(newScreening);

    // Retornar com relações carregadas
    const result = await this.screeningRepository.findOne({
      where: { id: savedScreening.id },
      relations: ["movie", "theater"],
    });

    console.log(`✅ Sessão criada com sucesso: ID ${savedScreening.id}`);
    return result!;
  }

  /* Atualiza os dados de uma sessão existente - OTIMIZADO */
  async update(
    id: number,
    data: Partial<Screening>
  ): Promise<Screening | null> {
    const screening = await this.screeningRepository.findOneBy({ id });

    if (!screening) {
      console.log(`⚠️ Sessão com ID ${id} não encontrada para atualização`);
      return null;
    }

    // Se estiver mudando data/hora/sala, validar conflito
    if (data.theaterId || data.screeningDate || data.startTime) {
      const theaterId = data.theaterId ?? screening.theaterId;
      const screeningDate = data.screeningDate ?? screening.screeningDate;
      const startTime = data.startTime ?? screening.startTime;

      await this.validateTimeConflict(theaterId, screeningDate, startTime, id);
    }

    await this.screeningRepository.update(id, data);

    // Retornar apenas com campos essenciais usando QueryBuilder
    const updatedScreening = await this.screeningRepository
      .createQueryBuilder("screening")
      .select([
        "screening.id",
        "screening.movieId",
        "screening.theaterId",
        "screening.screeningDate",
        "screening.startTime",
        "screening.availableSeats",
        "screening.basePrice",
        "screening.active",
        "movie.id",
        "movie.name",
        "movie.duration",
        "theater.id",
        "theater.name",
        "theater.capacity",
      ])
      .leftJoin("screening.movie", "movie")
      .leftJoin("screening.theater", "theater")
      .where("screening.id = :id", { id })
      .getOne();

    console.log(`✅ Sessão atualizada com sucesso: ID ${id}`);
    return updatedScreening;
  }

  /* Ativa uma sessão (torna visível no sistema) */
  async activate(id: number): Promise<boolean | "already_active"> {
    const screening = await this.screeningRepository.findOneBy({ id });

    if (!screening) {
      console.log(`🔴 Sessão com ID ${id} não encontrada para ativação`);
      return false;
    }

    if (screening.active) {
      console.log(`⚠️ Sessão ID ${id} já está ativa`);
      return "already_active";
    }

    await this.screeningRepository.update(id, { active: true });

    console.log(`🟢 Sessão ID ${id} ativada com sucesso`);
    return true;
  }

  /* Desativa uma sessão (remove da visualização do sistema) */
  async deactivate(id: number): Promise<boolean | "already_inactive"> {
    const screening = await this.screeningRepository.findOneBy({ id });

    if (!screening) {
      console.log(`🔴 Sessão com ID ${id} não encontrada para desativação`);
      return false;
    }

    if (!screening.active) {
      console.log(`⚠️ Sessão ID ${id} já está inativa`);
      return "already_inactive";
    }

    await this.screeningRepository.update(id, { active: false });

    console.log(`🔴 Sessão ID ${id} desativada com sucesso`);
    return true;
  }

  /* Desativa sessões expiradas (data + horário já passaram + tolerância) - OTIMIZADO */
  async deactivateExpiredScreenings(): Promise<number> {
    try {
      const now = new Date();
      const TOLERANCE_MINUTES = 30;

      // Query otimizada: busca APENAS campos necessários
      const screenings = await this.screeningRepository
        .createQueryBuilder("screening")
        .select([
          "screening.id",
          "screening.screeningDate",
          "screening.startTime",
          "movie.duration",
        ])
        .innerJoin("screening.movie", "movie")
        .where("screening.active = :active", { active: true })
        .getMany();

      let deactivatedCount = 0;

      for (const screening of screenings) {
        // Combinar data e horário em um Date
        const [hours, minutes] = screening.startTime.split(":").map(Number);
        const screeningDateTime = new Date(screening.screeningDate);
        screeningDateTime.setHours(hours, minutes, 0, 0);

        // Adicionar duração do filme + tolerância
        const endTime = new Date(screeningDateTime);
        endTime.setMinutes(
          endTime.getMinutes() + screening.movie.duration + TOLERANCE_MINUTES
        );

        // Se passou do horário + tolerância, desativar
        if (now > endTime) {
          await this.screeningRepository.update(screening.id, {
            active: false,
          });
          deactivatedCount++;
        }
      }

      console.log(`✅ ${deactivatedCount} sessões expiradas desativadas`);
      return deactivatedCount;
    } catch (error) {
      console.error(`Erro ao desativar sessões expiradas: ${error}`);
      throw error;
    }
  }

  /* Valida se todos os campos obrigatórios foram fornecidos */
  private validateRequiredFields(data: Partial<Screening>): void {
    if (!data.movieId) {
      console.log(`🔴 Erro: ID do filme é obrigatório`);
      throw new Error("Movie ID is required");
    }

    if (!data.theaterId) {
      console.log(`🔴 Erro: ID da sala é obrigatório`);
      throw new Error("Theater ID is required");
    }

    if (!data.screeningDate) {
      console.log(`🔴 Erro: Data da sessão é obrigatória`);
      throw new Error("Screening date is required");
    }

    if (!data.startTime) {
      console.log(`🔴 Erro: Horário de início é obrigatório`);
      throw new Error("Start time is required");
    }

    if (!data.availableSeats) {
      console.log(`🔴 Erro: Número de assentos disponíveis é obrigatório`);
      throw new Error("Available seats is required");
    }

    if (!data.basePrice) {
      console.log(`🔴 Erro: Preço base é obrigatório`);
      throw new Error("Base price is required");
    }
  }

  /* Valida se há conflito de horário na sala escolhida */
  private async validateTimeConflict(
    theaterId: number,
    screeningDate: Date,
    startTime: string,
    excludeScreeningId?: number
  ): Promise<void> {
    const conflict = await this.findTimeConflict(
      theaterId,
      screeningDate,
      startTime,
      excludeScreeningId
    );

    if (conflict) {
      console.log(
        `🔴 Conflito de horário detectado com sessão ID: ${conflict.id}`
      );
      throw new Error(
        `Theater already booked. Conflict with screening ID: ${conflict.id}`
      );
    }
  }

  /* Busca conflitos de horário na mesma sala e data */
  private async findTimeConflict(
    theaterId: number,
    screeningDate: Date,
    startTime: string,
    excludeScreeningId?: number
  ): Promise<Screening | null> {
    // Buscar apenas campos necessários para validação
    const screenings = await this.screeningRepository
      .createQueryBuilder("screening")
      .select(["screening.id", "screening.startTime", "movie.duration"])
      .innerJoin("screening.movie", "movie")
      .where("screening.theaterId = :theaterId", { theaterId })
      .andWhere("screening.screeningDate = :screeningDate", { screeningDate })
      .andWhere("screening.active = :active", { active: true })
      .getMany();

    // Converter horário de início para minutos
    const [hours, minutes] = startTime.split(":").map(Number);
    const newStartMinutes = hours * 60 + minutes;

    // Verificar conflitos
    for (const screening of screenings) {
      // Ignorar a própria sessão se estiver atualizando
      if (excludeScreeningId && screening.id === excludeScreeningId) {
        continue;
      }

      const [existingHours, existingMinutes] = screening.startTime
        .split(":")
        .map(Number);
      const existingStartMinutes = existingHours * 60 + existingMinutes;
      const existingEndMinutes =
        existingStartMinutes + screening.movie.duration;

      // Verificar se há sobreposição (com margem de 15 minutos para limpeza)
      const CLEANUP_TIME = 15;
      if (
        newStartMinutes >= existingStartMinutes - CLEANUP_TIME &&
        newStartMinutes <= existingEndMinutes + CLEANUP_TIME
      ) {
        return screening;
      }
    }

    return null;
  }
}
