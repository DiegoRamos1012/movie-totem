import { AppDataSource } from "../config/database.js";
import { Screening } from "../models/Screening.js";
import { Between, LessThan } from "typeorm";

export class ScreeningService {
  private screeningRepository = AppDataSource.getRepository(Screening);

  /* Busca todas as sessões ativas em ordem crescente de horário */
  async findAll(): Promise<Screening[]> {
    const screenings = await this.screeningRepository.find({
      where: { active: true },
      relations: ["movie", "theater"],
      order: { screeningTime: "ASC" },
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
      `✅ Sessão encontrada: ${screening.movie?.name} - ${screening.screeningTime}`
    );
    return screening;
  }

  /* Cria uma nova sessão de filme */
  async create(screeningData: Partial<Screening>): Promise<Screening> {
    // Validar campos obrigatórios
    this.validateRequiredFields(screeningData);

    // Validar conflito de horário na sala
    await this.validateTimeConflict(
      screeningData.theaterId!,
      new Date(screeningData.screeningTime!)
    );

    const newScreening = this.screeningRepository.create({
      ...screeningData,
      active: screeningData.active ?? true,
      availableSeats: screeningData.availableSeats,
      basePrice: screeningData.basePrice,
    });

    const savedScreening = await this.screeningRepository.save(newScreening);
    console.log(`✅ Sessão criada com sucesso: ID ${savedScreening.id}`);
    return savedScreening;
  }

  /* Atualiza os dados de uma sessão existente */
  async update(
    id: number,
    data: Partial<Screening>
  ): Promise<Screening | null> {
    const screening = await this.screeningRepository.findOneBy({ id });

    if (!screening) {
      console.log(`⚠️ Sessão com ID ${id} não encontrada para atualização`);
      return null;
    }

    await this.screeningRepository.update(id, data);

    const updatedScreening = await this.screeningRepository.findOne({
      where: { id },
      relations: ["movie", "theater"],
    });

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

  /* Desativa automaticamente sessões expiradas (após 20 minutos do horário) */
  async deactivateExpiredScreenings(): Promise<number> {
    const now = new Date();
    const toleranceMinutes = 20;

    // Calcular data limite (20 minutos atrás)
    const expiredTime = new Date(now.getTime() - toleranceMinutes * 60 * 1000);

    const result = await this.screeningRepository.update(
      {
        screeningTime: LessThan(expiredTime),
        active: true,
      },
      {
        active: false,
      }
    );

    const affected = result.affected || 0;

    if (affected > 0) {
      console.log(
        `⏰ ${affected} sessões expiradas foram desativadas automaticamente`
      );
    }

    return affected;
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

    if (!data.screeningTime) {
      console.log(`🔴 Erro: Horário da sessão é obrigatório`);
      throw new Error("Screening time is required");
    }
  }

  /* Valida se há conflito de horário na sala escolhida */
  private async validateTimeConflict(
    theaterId: number,
    screeningTime: Date
  ): Promise<void> {
    const conflict = await this.findTimeConflict(theaterId, screeningTime);

    if (conflict) {
      console.log(
        `🔴 Conflito de horário detectado com sessão ID: ${conflict.id}`
      );
      throw new Error(
        `Theater already booked. Conflict with screening ID: ${conflict.id}`
      );
    }
  }

  /* Busca conflitos de horário em uma janela de 3 horas */
  private async findTimeConflict(
    theaterId: number,
    screeningTime: Date
  ): Promise<Screening | null> {
    const threeHours = 3 * 60 * 60 * 1000;
    const startTime = new Date(screeningTime.getTime() - threeHours);
    const endTime = new Date(screeningTime.getTime() + threeHours);

    return await this.screeningRepository.findOne({
      where: {
        theaterId,
        screeningTime: Between(startTime, endTime),
        active: true,
      },
    });
  }
}
