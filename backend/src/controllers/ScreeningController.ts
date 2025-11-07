import type { Request, Response } from "express";
import { ScreeningService } from "../services/ScreeningService.js";

const screeningService = new ScreeningService();

/* Lista todas as sessões ativas do sistema */
export const getScreenings = async (req: Request, res: Response) => {
  try {
    const screenings = await screeningService.findAll();

    if (screenings.length === 0) {
      console.log("Nenhuma sessão foi encontrada no banco de dados");
      return res.status(200).json({
        message: "Nenhuma sessão foi cadastrada",
        data: [],
      });
    }

    return res.status(200).json(screenings);
  } catch (error: any) {
    console.error(`Erro ao buscar sessões: ${error}`);
    return res.status(500).json({
      message: "Erro ao buscar sessões",
      error: error.message,
    });
  }
};

/* Busca uma sessão específica por ID */
export const getScreeningById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID de sessão inválido" });
    }

    const screening = await screeningService.findById(id);

    if (!screening) {
      return res.status(404).json({ message: "Sessão não encontrada" });
    }

    return res.status(200).json(screening);
  } catch (error: any) {
    console.error(`Erro ao buscar sessão: ${error}`);
    return res.status(500).json({
      message: "Erro ao buscar sessão",
      error: error.message,
    });
  }
};

/* Busca sessões agrupadas por filme */
export const getScreeningsByMovie = async (req: Request, res: Response) => {
  try {
    const movieId = parseInt(req.params.movieId || "");

    if (isNaN(movieId) || movieId <= 0) {
      return res.status(400).json({ message: "ID de filme inválido" });
    }

    const screenings = await screeningService.findByMovie(movieId);

    if (screenings.length === 0) {
      return res.status(404).json({
        message: "Nenhuma sessão encontrada para este filme",
      });
    }

    // Agrupar por data e sala
    const grouped = screenings.reduce((acc: any, screening: any) => {
      // Formatar data corretamente
      const screeningDate = new Date(screening.screeningDate);
      const date = screeningDate.toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      });

      if (!acc[date]) {
        acc[date] = [];
      }

      // Formatar horário corretamente (já vem como string "HH:MM:SS")
      const startTime = screening.startTime.substring(0, 5); // "19:00:00" -> "19:00"

      acc[date].push({
        id: screening.id,
        theater: screening.theater.name,
        theaterId: screening.theaterId,
        capacity: screening.theater.capacity,
        startTime: startTime,
        availableSeats: screening.availableSeats,
        price: parseFloat(screening.basePrice),
      });

      return acc;
    }, {});

    return res.status(200).json({
      movieId,
      movie: screenings[0]?.movie,
      sessionsByDate: grouped,
    });
  } catch (error: any) {
    console.error(`Erro ao buscar sessões do filme: ${error}`);
    return res.status(500).json({
      message: "Erro ao buscar sessões do filme",
      error: error.message,
    });
  }
};

/* Cria uma nova sessão de filme */
export const addScreening = async (req: Request, res: Response) => {
  try {
    const newScreening = await screeningService.create(req.body);
    return res.status(201).json(newScreening);
  } catch (error: any) {
    console.error(`Erro ao criar sessão: ${error}`);

    const statusCode =
      error.message.includes("required") || error.message.includes("booked")
        ? 400
        : 500;

    return res.status(statusCode).json({
      message: "Erro ao criar sessão",
      error: error.message,
    });
  }
};

/* Atualiza os dados de uma sessão existente */
export const updateScreening = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID de sessão inválido" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Nenhum dado fornecido para atualização",
      });
    }

    const performedBy = (req as any).usuario;
    const updatedScreening = await screeningService.update(id, req.body, {
      id: performedBy?.id,
      name: performedBy?.name,
    });

    if (!updatedScreening) {
      return res.status(404).json({ message: "Sessão não encontrada" });
    }

    return res.status(200).json({
      message: "Sessão atualizada com sucesso",
      screening: updatedScreening,
    });
  } catch (error: any) {
    console.error(`Erro ao atualizar sessão: ${error}`);
    return res.status(500).json({
      message: "Erro ao atualizar sessão",
      error: error.message,
    });
  }
};

/* Ativa uma sessão (torna visível no sistema) */
export const activateScreening = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID de sessão inválido" });
    }

    const performedBy = (req as any).usuario;
    const result = await screeningService.activate(id, {
      id: performedBy?.id,
      name: performedBy?.name,
    });

    if (result === false) {
      return res.status(404).json({ message: "Sessão não encontrada" });
    }

    if (result === "already_active") {
      return res.status(200).json({ message: "Sessão já está ativa" });
    }

    return res.status(200).json({ message: "Sessão ativada com sucesso" });
  } catch (error: any) {
    console.error(`Erro ao ativar sessão: ${error}`);
    return res.status(500).json({
      message: "Erro ao ativar sessão",
      error: error.message,
    });
  }
};

/* Desativa uma sessão (remove da visualização do sistema) */
export const deactivateScreening = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID de sessão inválido" });
    }

    const performedBy = (req as any).usuario;
    const result = await screeningService.deactivate(id, {
      id: performedBy?.id,
      name: performedBy?.name,
    });

    if (result === false) {
      return res.status(404).json({ message: "Sessão não encontrada" });
    }

    if (result === "already_inactive") {
      return res.status(200).json({ message: "Sessão já está inativa" });
    }

    return res.status(200).json({ message: "Sessão desativada com sucesso" });
  } catch (error: any) {
    console.error(`Erro ao desativar sessão: ${error}`);
    return res.status(500).json({
      message: "Erro ao desativar sessão",
      error: error.message,
    });
  }
};
