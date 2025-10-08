import type { Request, Response } from "express";
import { SnackService } from "../services/SnackService.js";

const snackService = new SnackService();

/* Busca todos os snacks disponíveis */
export const getSnacks = async (req: Request, res: Response) => {
  try {
    const snacks = await snackService.findAll();
    return res.status(200).json(snacks);
  } catch (error: any) {
    console.error(`Error fetching snacks: ${error}`);
    return res.status(500).json({
      message: "Error fetching snacks",
      error: error.message,
    });
  }
};

/* Busca um snack específico por ID */
export const getSnackById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid snack ID" });
    }

    const snack = await snackService.findById(id);

    if (!snack) {
      return res.status(404).json({ message: "Snack not found" });
    }

    return res.status(200).json(snack);
  } catch (error: any) {
    console.error(`Error fetching snack: ${error}`);
    return res.status(500).json({
      message: "Error fetching snack",
      error: error.message,
    });
  }
};

/* Cria um novo snack */
export const addSnack = async (req: Request, res: Response) => {
  try {
    const newSnack = await snackService.create(req.body);
    return res.status(201).json(newSnack);
  } catch (error: any) {
    console.error(`Error creating snack: ${error}`);
    return res.status(500).json({
      message: "Error creating snack",
      error: error.message,
    });
  }
};

/* Atualiza um snack existente */
export const updateSnack = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid snack ID" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const updated = await snackService.update(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Snack not found" });
    }

    return res.status(200).json({ message: "Snack updated successfully" });
  } catch (error: any) {
    console.error(`Error updating snack: ${error}`);
    return res.status(500).json({
      message: "Error updating snack",
      error: error.message,
    });
  }
};

/* Desativa um snack */
export const deactivateSnack = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid snack ID" });
    }

    const deactivated = await snackService.deactivate(id);

    if (!deactivated) {
      return res.status(404).json({ message: "Snack not found" });
    }

    return res.status(200).json({ message: "Snack deactivated successfully" });
  } catch (error: any) {
    console.error(`Error deactivating snack: ${error}`);
    return res.status(500).json({
      message: "Error deactivating snack",
      error: error.message,
    });
  }
};

/* Atualiza estoque de um snack */
export const updateSnackStock = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");
    const { quantity } = req.body;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid snack ID" });
    }

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ message: "Invalid quantity value" });
    }

    const updated = await snackService.updateStock(id, quantity);

    if (!updated) {
      return res.status(404).json({ message: "Snack not found" });
    }

    return res.status(200).json({ message: "Stock updated successfully" });
  } catch (error: any) {
    console.error(`Error updating stock: ${error}`);
    return res.status(500).json({
      message: "Error updating stock",
      error: error.message,
    });
  }
};
