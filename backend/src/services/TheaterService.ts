import { AppDataSource } from "../config/database.js";
import { Theater } from "../models/Theater.js";

export class TheaterService {
  private theaterRepository = AppDataSource.getRepository(Theater);

  /* Busca todas as salas ativas, ordenadas por nome */
  async findAll(): Promise<Theater[]> {
    const theaters = await this.theaterRepository.find({
      where: { active: true },
      order: { name: "ASC" },
    });

    console.log(`✅ ${theaters.length} salas ativas encontradas`);
    return theaters;
  }

  /* Busca uma sala específica por ID */
  async findById(id: number): Promise<Theater | null> {
    const theater = await this.theaterRepository.findOne({
      where: { id },
    });

    if (!theater) {
      console.log(`⚠️ Sala com ID ${id} não encontrada`);
      return null;
    }

    console.log(`✅ Sala encontrada: ${theater.name}`);
    return theater;
  }

    async findByName(name: string): Promise<Theater | null> {
    return await this.theaterRepository.findOne({
      where: { name },
    });
  }

  /* Cria uma nova sala no sistema */
  async create(theaterData: Partial<Theater>): Promise<Theater> {
    const theater = this.theaterRepository.create({
      ...theaterData,
      active: theaterData.active ?? true,
    });

    const savedTheater = await this.theaterRepository.save(theater);
    console.log(
      `✅ Sala criada com sucesso: ${savedTheater.name} (ID: ${savedTheater.id})`
    );
    return savedTheater;
  }

  /* Atualiza os dados de uma sala existente */
  async update(
    id: number,
    theaterData: Partial<Theater>
  ): Promise<Theater | null> {
    const theater = await this.theaterRepository.findOneBy({ id });

    if (!theater) {
      console.log(`⚠️ Sala com ID ${id} não encontrada para atualização`);
      return null;
    }

    await this.theaterRepository.update(id, theaterData);

    const updatedTheater = await this.theaterRepository.findOneBy({ id });
    console.log(`✅ Sala atualizada com sucesso: ${updatedTheater?.name}`);
    return updatedTheater;
  }

  /* Ativa uma sala (torna disponível para sessões) */
  async activate(id: number): Promise<boolean | "already_active"> {
    const theater = await this.theaterRepository.findOneBy({ id });

    if (!theater) {
      console.log(`🔴 Sala com ID ${id} não encontrada para ativação`);
      return false;
    }

    if (theater.active) {
      console.log(`⚠️ Sala "${theater.name}" já está ativa`);
      return "already_active";
    }

    await this.theaterRepository.update(id, { active: true });

    console.log(`🟢 Sala "${theater.name}" ativada com sucesso`);
    return true;
  }

  /* Desativa uma sala (impede novas sessões) */
  async deactivate(id: number): Promise<boolean | "already_inactive"> {
    const theater = await this.theaterRepository.findOneBy({ id });

    if (!theater) {
      console.log(`🔴 Sala com ID ${id} não encontrada para desativação`);
      return false;
    }

    if (!theater.active) {
      console.log(`⚠️ Sala "${theater.name}" já está inativa`);
      return "already_inactive";
    }

    await this.theaterRepository.update(id, { active: false });

    console.log(`🔴 Sala "${theater.name}" desativada com sucesso`);
    return true;
  }
}
