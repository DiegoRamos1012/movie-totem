import type { Request, Response } from "express";
import { ScreeningService } from "../services/ScreeningService.js";

const screeningService = new ScreeningService();

/* Busca todas as sessões ativas */
export const getScreenings = async (req: Request, res: Response) => {
  try {
    const screenings = await screeningService.findAll();
    return res.status(200).json(screenings);
  } catch (error: any) {
    console.error(`Error fetching screenings: ${error}`);
    return res.status(500).json({
      message: "Error fetching screenings",
      error: error.message,
    });
  }
};

/* Busca uma sessão específica por ID */
export const getScreeningById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid screening ID" });
    }

    const screening = await screeningService.findById(id);

    if (!screening) {
      return res.status(404).json({ message: "Screening not found" });
    }

    return res.status(200).json(screening);
  } catch (error: any) {
    console.error(`Error fetching screening: ${error}`);
    return res.status(500).json({
      message: "Error fetching screening",
      error: error.message,
    });
  }
};

/* Cria uma nova sessão */
export const addScreening = async (req: Request, res: Response) => {
  try {
    const newScreening = await screeningService.create(req.body);
    return res.status(201).json(newScreening);
  } catch (error: any) {
    console.error(`Error creating screening: ${error}`);

    const statusCode =
      error.message.includes("required") || error.message.includes("booked")
        ? 400
        : 500;

    return res.status(statusCode).json({
      message: "Error creating screening",
      error: error.message,
    });
  }
};

/* Atualiza uma sessão existente */
export const updateScreening = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid screening ID" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const updated = await screeningService.updateScreening(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Screening not found" });
    }

    return res.status(200).json({ message: "Screening updated successfully" });
  } catch (error: any) {
    console.error(`Error updating screening: ${error}`);
    return res.status(500).json({
      message: "Error updating screening",
      error: error.message,
    });
  }
};
