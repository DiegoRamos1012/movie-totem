import { AppDataSource } from "../config/database.js";
import { Ticket } from "../models/Ticket.js";
import { Screening } from "../models/Screening.js";
import { Seat } from "../models/Seat.js";

export class TicketService {
  private ticketRepository = AppDataSource.getRepository(Ticket);
  private screeningRepository = AppDataSource.getRepository(Screening);
  private seatRepository = AppDataSource.getRepository(Seat);

  async findAll(): Promise<Ticket[]> {
    const tickets = await this.ticketRepository
      .createQueryBuilder("ticket")
      .select([
        "ticket.id",
        "ticket.screeningId",
        "ticket.seatId",
        "ticket.purchaseTime",
        "ticket.price",
        "screening.id",
        "screening.screeningDate",
        "screening.startTime",
        "movie.id",
        "movie.name",
        "theater.id",
        "theater.name",
        "seat.id",
        "seat.row",
        "seat.number",
      ])
      .leftJoin("ticket.screening", "screening")
      .leftJoin("screening.movie", "movie")
      .leftJoin("screening.theater", "theater")
      .leftJoin("ticket.seat", "seat")
      .orderBy("ticket.purchaseTime", "DESC")
      .getMany();

    console.log(`✅ ${tickets.length} ingressos encontrados`);
    return tickets;
  }

  async findById(id: number): Promise<Ticket | null> {
    const ticket = await this.ticketRepository
      .createQueryBuilder("ticket")
      .select([
        "ticket.id",
        "ticket.screeningId",
        "ticket.seatId",
        "ticket.purchaseTime",
        "ticket.price",
        "screening.id",
        "screening.screeningDate",
        "screening.startTime",
        "screening.basePrice",
        "movie.id",
        "movie.name",
        "movie.posterUrl",
        "theater.id",
        "theater.name",
        "seat.id",
        "seat.row",
        "seat.number",
      ])
      .leftJoin("ticket.screening", "screening")
      .leftJoin("screening.movie", "movie")
      .leftJoin("screening.theater", "theater")
      .leftJoin("ticket.seat", "seat")
      .where("ticket.id = :id", { id })
      .getOne();

    if (!ticket) {
      console.log(`⚠️ Ingresso com ID ${id} não encontrado`);
      return null;
    }

    console.log(`✅ Ingresso encontrado: ID ${id}`);
    return ticket;
  }

  async findByScreening(screeningId: number): Promise<Ticket[]> {
    return await this.ticketRepository
      .createQueryBuilder("ticket")
      .select([
        "ticket.id",
        "ticket.seatId",
        "ticket.purchaseTime",
        "ticket.price",
        "seat.id",
        "seat.row",
        "seat.number",
      ])
      .leftJoin("ticket.seat", "seat")
      .where("ticket.screeningId = :screeningId", { screeningId })
      .orderBy("ticket.purchaseTime", "DESC")
      .getMany();
  }

  async create(ticketData: Partial<Ticket>): Promise<Ticket> {
    this.validateRequiredFields(ticketData);
    await this.validateScreeningExists(ticketData.screeningId!);
    await this.validateSeatExists(ticketData.seatId!);
    await this.validateSeatAvailable(
      ticketData.screeningId!,
      ticketData.seatId!
    );

    const screening = await this.screeningRepository.findOne({
      where: { id: ticketData.screeningId },
      relations: ["movie"],
    });

    const finalPrice = ticketData.price ?? screening!.basePrice;

    const newTicket = this.ticketRepository.create({
      ...ticketData,
      price: finalPrice,
    });

    const savedTicket = await this.ticketRepository.save(newTicket);

    await this.screeningRepository.decrement(
      { id: ticketData.screeningId },
      "availableSeats",
      1
    );

    const result = await this.ticketRepository
      .createQueryBuilder("ticket")
      .select([
        "ticket.id",
        "ticket.screeningId",
        "ticket.seatId",
        "ticket.purchaseTime",
        "ticket.price",
        "screening.id",
        "screening.screeningDate",
        "screening.startTime",
        "movie.id",
        "movie.name",
        "theater.id",
        "theater.name",
        "seat.id",
        "seat.row",
        "seat.number",
      ])
      .leftJoin("ticket.screening", "screening")
      .leftJoin("screening.movie", "movie")
      .leftJoin("screening.theater", "theater")
      .leftJoin("ticket.seat", "seat")
      .where("ticket.id = :id", { id: savedTicket.id })
      .getOne();

    console.log(`✅ Ingresso criado com sucesso: ID ${savedTicket.id}`);
    return result!;
  }

  async delete(id: number): Promise<boolean> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ["screening"],
    });

    if (!ticket) {
      console.log(`⚠️ Ingresso com ID ${id} não encontrado para exclusão`);
      return false;
    }

    await this.ticketRepository.delete(id);

    await this.screeningRepository.increment(
      { id: ticket.screeningId },
      "availableSeats",
      1
    );

    console.log(`✅ Ingresso ID ${id} excluído com sucesso`);
    return true;
  }

  private validateRequiredFields(data: Partial<Ticket>): void {
    if (!data.screeningId) {
      console.log(`🔴 Erro: ID da sessão é obrigatório`);
      throw new Error("Screening ID is required");
    }

    if (!data.seatId) {
      console.log(`🔴 Erro: ID do assento é obrigatório`);
      throw new Error("Seat ID is required");
    }
  }

  private async validateScreeningExists(screeningId: number): Promise<void> {
    const screening = await this.screeningRepository.findOne({
      where: { id: screeningId, active: true },
    });

    if (!screening) {
      console.log(
        `🔴 Erro: Sessão ID ${screeningId} não encontrada ou inativa`
      );
      throw new Error("Screening not found or inactive");
    }
  }

  private async validateSeatExists(seatId: number): Promise<void> {
    const seat = await this.seatRepository.findOne({
      where: { id: seatId },
    });

    if (!seat) {
      console.log(`🔴 Erro: Assento ID ${seatId} não encontrado`);
      throw new Error("Seat not found");
    }
  }

  private async validateSeatAvailable(
    screeningId: number,
    seatId: number
  ): Promise<void> {
    const existingTicket = await this.ticketRepository.findOne({
      where: {
        screeningId,
        seatId,
      },
    });

    if (existingTicket) {
      console.log(
        `🔴 Erro: Assento ID ${seatId} já está ocupado na sessão ${screeningId}`
      );
      throw new Error("Seat already taken for this screening");
    }
  }
}
