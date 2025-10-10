import { AppDataSource } from "../config/database.js";
import { Seat } from "../models/Seat.js";

export class SeatService {
  private seatRepository = AppDataSource.getRepository(Seat);

  /* Busca todos os assentos de uma sala */
  async findByTheater(theaterId: number): Promise<Seat[]> {
    return await this.seatRepository.find({
      where: { theater: { id: theaterId } },
      order: { row: "ASC", number: "ASC" },
      relations: ["theater"],
    });
  }

  /* Busca assentos disponíveis de uma sala */
  async findAvailableByTheater(theaterId: number): Promise<Seat[]> {
    return await this.seatRepository.find({
      where: { theater: { id: theaterId }, available: true },
      order: { row: "ASC", number: "ASC" },
      relations: ["theater"],
    });
  }

  /* Busca um assento específico por ID */
  async findById(id: number): Promise<Seat | null> {
    return await this.seatRepository.findOne({
      where: { id },
    });
  }

  /* Busca assento por fileira, número e sala */
  async findByRowAndNumber(
    theaterId: number,
    row: string,
    number: number
  ): Promise<Seat | null> {
    return await this.seatRepository.findOne({
      where: { theater: { id: theaterId }, row, number },
      relations: ["theater"],
    });
  }

  /* Gera assentos automaticamente para uma sala */
  async generateSeats(
    theaterId: number,
    rows: string[],
    columns: number
  ): Promise<number> {
    let createdCount = 0;

    for (const row of rows) {
      for (let col = 1; col <= columns; col++) {
        // Verifica se assento já existe
        const existing = await this.findByRowAndNumber(theaterId, row, col);
        if (existing) {
          console.log(`ℹ️ Assento ${row}${col} já existe na sala ${theaterId}`);
          continue;
        }

        const seat = this.seatRepository.create({
          theater: { id: theaterId },
          row,
          number: col,
          available: true,
        });

        await this.seatRepository.save(seat);
        createdCount++;
      }
    }

    console.log(`✅ ${createdCount} assentos gerados para sala ${theaterId}`);
    return createdCount;
  }

  /* Reserva um assento (marca como indisponível) */
  async reserve(id: number): Promise<boolean | "already_reserved"> {
    const seat = await this.findById(id);

    if (!seat) {
      console.log(`⚠️ Tentativa de reservar assento inexistente (ID: ${id})`);
      return false;
    }

    if (!seat.available) {
      console.log(
        `ℹ️ Assento ${seat.row}${seat.number} já está reservado (ID: ${id})`
      );
      return "already_reserved";
    }

    const result = await this.seatRepository.update(id, { available: false });

    if (result.affected !== 0) {
      console.log(
        `🔴 Assento reservado: ${seat.row}${seat.number} (ID: ${id})`
      );
      return true;
    }

    return false;
  }

  /* Libera um assento (marca como disponível) */
  async release(id: number): Promise<boolean | "already_available"> {
    const seat = await this.findById(id);

    if (!seat) {
      console.log(`⚠️ Tentativa de liberar assento inexistente (ID: ${id})`);
      return false;
    }

    if (seat.available) {
      console.log(
        `ℹ️ Assento ${seat.row}${seat.number} já está disponível (ID: ${id})`
      );
      return "already_available";
    }

    const result = await this.seatRepository.update(id, { available: true });

    if (result.affected !== 0) {
      console.log(`🟢 Assento liberado: ${seat.row}${seat.number} (ID: ${id})`);
      return true;
    }

    return false;
  }

  /* Libera todos os assentos de uma sala */
  async releaseAllByTheater(theaterId: number): Promise<number> {
    const result = await this.seatRepository.update(
      { theater: { id: theaterId } },
      { available: true }
    );

    const count = result.affected || 0;
    console.log(`🟢 ${count} assentos liberados na sala ${theaterId}`);
    return count;
  }

  /* Remove todos os assentos de uma sala */
  async deleteByTheater(theaterId: number): Promise<number> {
    const result = await this.seatRepository.delete({
      theater: { id: theaterId },
    });
    const count = result.affected || 0;
    console.log(`🗑️ ${count} assentos removidos da sala ${theaterId}`);
    return count;
  }
}
