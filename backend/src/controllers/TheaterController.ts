import type { Request, Response } from "express";
import { TheaterService } from "../services/TheaterService.js";

const theaterService = new TheaterService();

/* Lista todas as salas ativas do sistema */
export const getTheaters = async (req: Request, res: Response) => {
  try {
    const theaters = await theaterService.findAll();

    if (theaters.length === 0) {
      console.log("ℹ️  Nenhuma sala ativa encontrada no banco");
      return res.status(200).json({
        message: "Nenhuma sala cadastrada",
        data: [],
      });
    }

    return res.status(200).json(theaters);
  } catch (error: any) {
    console.error(`Erro ao buscar salas: ${error}`);
    return res.status(500).json({
      message: "Erro ao buscar salas",
      error: error.message,
    });
  }
};

/* Busca uma sala específica por ID */
export const getTheaterById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID de sala inválido" });
    }

    const theater = await theaterService.findById(id);

    if (!theater) {
      return res.status(404).json({ message: "Sala não encontrada" });
    }

    return res.status(200).json(theater);
  } catch (error: any) {
    console.error(`Erro ao buscar sala: ${error}`);
    return res.status(500).json({
      message: "Erro ao buscar sala",
      error: error.message,
    });
  }
};

/* Cria uma nova sala no sistema */
export const addTheater = async (req: Request, res: Response) => {
  try {
    if (!req.body.name || !req.body.capacity) {
      return res.status(400).json({
        message: "Nome e capacidade são obrigatórios",
      });
    }

    // Verifica se já existe uma sala com o mesmo nome
    const existingTheater = await theaterService.findByName(req.body.name);
    if (existingTheater) {
      return res.status(409).json({
        message: "Já existe uma sala com este nome",
      });
    }

    const newTheater = await theaterService.create(req.body);
    return res.status(201).json(newTheater);
  } catch (error: any) {
    console.error(`Erro ao criar sala: ${error}`);
    return res.status(500).json({
      message: "Erro ao criar sala",
      error: error.message,
    });
  }
};

/* Atualiza os dados de uma sala existente */
export const updateTheater = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID de sala inválido" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Nenhum dado fornecido para atualização",
      });
    }

    // Se estiver atualizando o nome, verifica se já existe outra sala com esse nome
    if (req.body.name) {
      const existingTheater = await theaterService.findByName(req.body.name);
      if (existingTheater && existingTheater.id !== id) {
        return res.status(409).json({
          message: "Já existe outra sala com este nome",
        });
      }
    }

    const updatedTheater = await theaterService.update(id, req.body);

    if (!updatedTheater) {
      return res.status(404).json({ message: "Sala não encontrada" });
    }

    return res.status(200).json({
      message: "Sala atualizada com sucesso",
      theater: updatedTheater,
    });
  } catch (error: any) {
    console.error(`Erro ao atualizar sala: ${error}`);
    return res.status(500).json({
      message: "Erro ao atualizar sala",
      error: error.message,
    });
  }
};

/* Ativa uma sala (torna disponível para sessões) */
export const activateTheater = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID de sala inválido" });
    }

    const result = await theaterService.activate(id);

    if (result === false) {
      return res.status(404).json({ message: "Sala não encontrada" });
    }

    if (result === "already_active") {
      return res.status(200).json({ message: "Sala já está ativa" });
    }

    return res.status(200).json({ message: "Sala ativada com sucesso" });
  } catch (error: any) {
    console.error(`Erro ao ativar sala: ${error}`);
    return res.status(500).json({
      message: "Erro ao ativar sala",
      error: error.message,
    });
  }
};

/* Desativa uma sala (impede novas sessões) */
export const deactivateTheater = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID de sala inválido" });
    }

    const result = await theaterService.deactivate(id);

    if (result === false) {
      return res.status(404).json({ message: "Sala não encontrada" });
    }

    if (result === "already_inactive") {
      return res.status(200).json({ message: "Sala já está inativa" });
    }

    return res.status(200).json({ message: "Sala desativada com sucesso" });
  } catch (error: any) {
    console.error(`Erro ao desativar sala: ${error}`);
    return res.status(500).json({
      message: "Erro ao desativar sala",
      error: error.message,
    });
  }
};
