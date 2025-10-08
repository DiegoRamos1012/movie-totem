import { AppDataSource } from "../config/database.js";
import { Screening } from "../models/Screening.js";
import { Between, LessThan } from "typeorm";

export class ScreeningService {
  private screeningRepository = AppDataSource.getRepository(Screening);

  /* Busca todas as sessões ativas em ordem crescente */
  async findAll(): Promise<Screening[]> {
    return await this.screeningRepository.find({
      where: { active: true },
      relations: ["movie", "theater"],
      order: { screeningTime: "ASC" },
    });
  }

  /* Cria uma sessão de filme */
  async create(screeningData: Partial<Screening>): Promise<Screening> {
    this.validateRequiredFields(screeningData);

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

    return await this.screeningRepository.save(newScreening);
  }

  /* Atualiza a sessão */
  async updateScreening(
    id: number,
    data: Partial<Screening>
  ): Promise<Screening> {
    const screening = await this.screeningRepository.findOneBy({ id });
    if (!screening) {
      throw new Error("Screening not found");
    }
    await this.screeningRepository.update(id, data);
    const updatedScreening = await this.screeningRepository.findOne({
      where: { id },
      relations: ["movie", "theater"],
    });
    return updatedScreening!;
  }

  /* Busca uma sessão específica por ID */
  async findById(id: number): Promise<Screening | null> {
    return await this.screeningRepository.findOne({
      where: { id },
      relations: ["movie", "theater"],
    });
  }

  /* Desativa sessões que passaram da tolerância de 20 minutos */
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

    return result.affected || 0;
  }

  // Validações privadas
  private validateRequiredFields(data: Partial<Screening>): void {
    if (!data.movieId) throw new Error("Movie ID is required");
    if (!data.theaterId) throw new Error("Theater ID is required");
    if (!data.screeningTime) throw new Error("Screening time is required");
  }

  private async validateTimeConflict(
    theaterId: number,
    screeningTime: Date
  ): Promise<void> {
    const conflict = await this.findTimeConflict(theaterId, screeningTime);

    if (conflict) {
      throw new Error(
        `Theater already booked. Conflict with screening ID: ${conflict.id}`
      );
    }
  }

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
