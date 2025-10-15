import { Request, Response } from "express";
import { TicketService } from "../services/TicketService.js";

const ticketService = new TicketService();

export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await ticketService.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar ingressos",
      error: (error as Error).message,
    });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await ticketService.findById(Number(id));

    if (!ticket) {
      return res.status(404).json({ message: "Ingresso não encontrado" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar ingresso",
      error: (error as Error).message,
    });
  }
};

export const getTicketsByScreening = async (req: Request, res: Response) => {
  try {
    const { screeningId } = req.params;
    const tickets = await ticketService.findByScreening(Number(screeningId));
    res.json(tickets);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar ingressos da sessão",
      error: (error as Error).message,
    });
  }
};

export const getSeatsMap = async (req: Request, res: Response) => {
  try {
    const { screeningId } = req.params;
    const ticketService = new TicketService();
    const seatsMap = await ticketService.getSeatsMap(Number(screeningId));
    res.json(seatsMap);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar mapa de assentos",
      error: (error as Error).message,
    });
  }
};

export const addTicket = async (req: Request, res: Response) => {
  try {
    const newTicket = await ticketService.create(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar ingresso",
      error: (error as Error).message,
    });
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ticketService.delete(Number(id));

    if (!result) {
      return res.status(404).json({ message: "Ingresso não encontrado" });
    }

    res.json({ message: "Ingresso excluído com sucesso" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao excluir ingresso",
      error: (error as Error).message,
    });
  }
};
