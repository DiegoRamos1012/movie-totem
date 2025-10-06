import type { Request, Response } from "express";
import { TheaterService } from "../services/TheaterService.js";

const theaterService = new TheaterService();

/* Busca todas as salas ativas */
export const getTheaters = async (req: Request, res: Response) => {
  try {
    const theaters = await theaterService.findAll();
    return res.status(200).json(theaters);
  } catch (error: any) {
    console.error(`Error fetching theaters: ${error}`);
    return res.status(500).json({
      message: "Error fetching theaters",
      error: error.message,
    });
  }
};

/* Busca uma sala específica por ID */
export const getTheaterById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid theater ID" });
    }

    const theater = await theaterService.findById(id);

    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    return res.status(200).json(theater);
  } catch (error: any) {
    console.error(`Error fetching theater: ${error}`);
    return res.status(500).json({
      message: "Error fetching theater",
      error: error.message,
    });
  }
};

/* Cria uma nova sala */
export const addTheater = async (req: Request, res: Response) => {
  try {
    const newTheater = await theaterService.create(req.body);
    return res.status(201).json(newTheater);
  } catch (error: any) {
    console.error(`Error creating theater: ${error}`);
    return res.status(500).json({
      message: "Error creating theater",
      error: error.message,
    });
  }
};

/* Atualiza uma sala existente */
export const updateTheater = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid theater ID" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const updated = await theaterService.update(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Theater not found" });
    }

    return res.status(200).json({ message: "Theater updated successfully" });
  } catch (error: any) {
    console.error(`Error updating theater: ${error}`);
    return res.status(500).json({
      message: "Error updating theater",
      error: error.message,
    });
  }
};

/* Desativa uma sala */
export const deactivateTheater = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid theater ID" });
    }

    const deactivated = await theaterService.desactivate(id);

    if (!deactivated) {
      return res.status(404).json({ message: "Theater not found" });
    }

    return res
      .status(200)
      .json({ message: "Theater deactivated successfully" });
  } catch (error: any) {
    console.error(`Error deactivating theater: ${error}`);
    return res.status(500).json({
      message: "Error deactivating theater",
      error: error.message,
    });
  }
};
