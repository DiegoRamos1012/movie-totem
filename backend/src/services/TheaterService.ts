import { AppDataSource } from "../config/database.js";
import { Theater } from "../models/Theater.js";

export class TheaterService {
  private theaterRepository = AppDataSource.getRepository(Theater);

  // Para o totem - listar salas ativas
  async findAll(): Promise<Theater[]> {
    return await this.theaterRepository.find({
      where: { active: true },
      order: { name: "ASC" },
    });
  }

  // Para vinculação com sessões
  async findById(id: number): Promise<Theater | null> {
    return await this.theaterRepository.findOne({
      where: { id },
    });
  }

  // Para administração
  async create(theaterData: Partial<Theater>): Promise<Theater> {
    const theater = this.theaterRepository.create({
      ...theaterData,
      active: theaterData.active ?? true,
    });
    return await this.theaterRepository.save(theater);
  }

  async desactivate(id: number): Promise<Theater> {
    const theater = await this.theaterRepository.findOneBy({ id });
    if (!theater) {
      throw new Error("Theater not found");
    }
    await this.theaterRepository.update(id, { active: false });
    const updatedTheater = await this.theaterRepository.findOneBy({ id });
    return updatedTheater!;
  }

  // Update apenas name, capacity e active - retorna o theater atualizado
  async update(id: number, theaterData: Partial<Theater>): Promise<Theater> {
    const theater = await this.theaterRepository.findOneBy({ id });
    if (!theater) {
      throw new Error("Theater not found");
    }
    await this.theaterRepository.update(id, theaterData);
    const updatedTheater = await this.theaterRepository.findOneBy({ id });
    return updatedTheater!;
  }
}
