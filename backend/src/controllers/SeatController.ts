import type { Request, Response } from "express";
import { SeatService } from "../services/SeatService.js";

const seatService = new SeatService();

/* Busca todos os assentos de uma sala */
export const getSeatsByTheater = async (req: Request, res: Response) => {
  try {
    const theaterId = parseInt(req.params.theaterId || "");

    if (isNaN(theaterId) || theaterId <= 0) {
      return res.status(400).json({ message: "Invalid theater ID" });
    }

    const seats = await seatService.findByTheater(theaterId);

    if (seats.length === 0) {
      console.log("Nenhum assento foi cadastrado no banco de dados")
      return res.status(200).json({
        message: "Nenhum assento foi cadastrado",
        data: []
      })
    }
    return res.status(200).json(seats);
  } catch (error: any) {
    console.error(`Error fetching seats: ${error}`);
    return res.status(500).json({
      message: "Error fetching seats",
      error: error.message,
    });
  }
};

/* Busca assentos disponíveis de uma sala */
export const getAvailableSeatsByTheater = async (
  req: Request,
  res: Response
) => {
  try {
    const theaterId = parseInt(req.params.theaterId || "");

    if (isNaN(theaterId) || theaterId <= 0) {
      return res.status(400).json({ message: "Invalid theater ID" });
    }

    const seats = await seatService.findAvailableByTheater(theaterId);
    return res.status(200).json(seats);
  } catch (error: any) {
    console.error(`Error fetching available seats: ${error}`);
    return res.status(500).json({
      message: "Error fetching available seats",
      error: error.message,
    });
  }
};

/* Busca um assento específico por ID */
export const getSeatById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid seat ID" });
    }

    const seat = await seatService.findById(id);

    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    return res.status(200).json(seat);
  } catch (error: any) {
    console.error(`Error fetching seat: ${error}`);
    return res.status(500).json({
      message: "Error fetching seat",
      error: error.message,
    });
  }
};

/* Gera assentos para uma sala */
export const generateSeats = async (req: Request, res: Response) => {
  try {
    const theaterId = parseInt(req.params.theaterId || "");
    const { rows, columns } = req.body;

    if (isNaN(theaterId) || theaterId <= 0) {
      return res.status(400).json({ message: "Invalid theater ID" });
    }

    if (!rows || !Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ message: "Invalid rows array" });
    }

    if (!columns || columns <= 0) {
      return res.status(400).json({ message: "Invalid columns value" });
    }

    const count = await seatService.generateSeats(theaterId, rows, columns);

    return res.status(201).json({
      message: "Seats generated successfully",
      count,
    });
  } catch (error: any) {
    console.error(`Error generating seats: ${error}`);
    return res.status(500).json({
      message: "Error generating seats",
      error: error.message,
    });
  }
};

/* Reserva um assento */
export const reserveSeat = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid seat ID" });
    }

    const result = await seatService.reserve(id);

    if (result === false) {
      return res.status(404).json({ message: "Seat not found" });
    }

    if (result === "already_reserved") {
      return res.status(200).json({
        message: "Seat is already reserved",
        alreadyReserved: true,
      });
    }

    return res.status(200).json({ message: "Seat reserved successfully" });
  } catch (error: any) {
    console.error(`Error reserving seat: ${error}`);
    return res.status(500).json({
      message: "Error reserving seat",
      error: error.message,
    });
  }
};

/* Libera um assento */
export const releaseSeat = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid seat ID" });
    }

    const result = await seatService.release(id);

    if (result === false) {
      return res.status(404).json({ message: "Seat not found" });
    }

    if (result === "already_available") {
      return res.status(200).json({
        message: "Seat is already available",
        alreadyAvailable: true,
      });
    }

    return res.status(200).json({ message: "Seat released successfully" });
  } catch (error: any) {
    console.error(`Error releasing seat: ${error}`);
    return res.status(500).json({
      message: "Error releasing seat",
      error: error.message,
    });
  }
};

/* Libera todos os assentos de uma sala */
export const releaseAllSeats = async (req: Request, res: Response) => {
  try {
    const theaterId = parseInt(req.params.theaterId || "");

    if (isNaN(theaterId) || theaterId <= 0) {
      return res.status(400).json({ message: "Invalid theater ID" });
    }

    const count = await seatService.releaseAllByTheater(theaterId);

    return res.status(200).json({
      message: "All seats released successfully",
      count,
    });
  } catch (error: any) {
    console.error(`Error releasing all seats: ${error}`);
    return res.status(500).json({
      message: "Error releasing all seats",
      error: error.message,
    });
  }
};

/* Remove todos os assentos de uma sala */
export const deleteAllSeats = async (req: Request, res: Response) => {
  try {
    const theaterId = parseInt(req.params.theaterId || "");

    if (isNaN(theaterId) || theaterId <= 0) {
      return res.status(400).json({ message: "Invalid theater ID" });
    }

    const count = await seatService.deleteByTheater(theaterId);

    return res.status(200).json({
      message: "All seats deleted successfully",
      count,
    });
  } catch (error: any) {
    console.error(`Error deleting all seats: ${error}`);
    return res.status(500).json({
      message: "Error deleting all seats",
      error: error.message,
    });
  }
};
