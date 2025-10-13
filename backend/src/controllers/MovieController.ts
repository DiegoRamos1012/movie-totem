import type { Request, Response } from "express";
import { MovieService } from "../services/MovieService.js";

const movieService = new MovieService();

 /* Lista todos os filmes ativos do sistema */
export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieService.findAll();

    if (movies.length === 0) {
      console.log("Nenhum filme foi cadastrado no banco de dados")
      return res.status(200).json({
        message: "Nenhum filme foi cadastrado",
        data: []
      })
    }


    return res.status(200).json(movies);
  } catch (error: any) {
    console.error(`Erro ao buscar filmes: ${error}`);
    return res.status(500).json({
      message: "Erro ao buscar filmes",
      error: error.message,
    });
  }
};

/* Busca um filme específico por ID */
export const getMovieById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID de filme inválido" });
    }

    const movie = await movieService.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }

    return res.status(200).json(movie);
  } catch (error: any) {
    console.error(`Erro ao buscar filme: ${error}`);
    return res.status(500).json({
      message: "Erro ao buscar filme",
      error: error.message,
    });
  }
};

/* Cria um novo filme no sistema */
export const addMovie = async (req: Request, res: Response) => {
  try {
    if (!req.body.name || !req.body.duration) {
      return res.status(400).json({
        message: "Nome e duração são obrigatórios",
      });
    }

    const newMovie = await movieService.create(req.body);
    return res.status(201).json(newMovie);
  } catch (error: any) {
    console.error(`Erro ao criar filme: ${error}`);
    return res.status(500).json({
      message: "Erro ao criar filme",
      error: error.message,
    });
  }
};

/* Atualiza os dados de um filme existente */
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID de filme inválido" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Nenhum dado fornecido para atualização",
      });
    }

    const updatedMovie = await movieService.update(id, req.body);

    if (!updatedMovie) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }

    return res.status(200).json({
      message: "Filme atualizado com sucesso",
      movie: updatedMovie,
    });
  } catch (error: any) {
    console.error(`Erro ao atualizar filme: ${error}`);
    return res.status(500).json({
      message: "Erro ao atualizar filme",
      error: error.message,
    });
  }
};

/* Ativa um filme (torna visível no sistema) */
export const activateMovie = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID de filme inválido" });
    }

    const result = await movieService.activate(id);

    if (result === false) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }

    if (result === "already_active") {
      return res.status(200).json({ message: "Filme já está ativo" });
    }

    return res.status(200).json({ message: "Filme ativado com sucesso" });
  } catch (error: any) {
    console.error(`Erro ao ativar filme: ${error}`);
    return res.status(500).json({
      message: "Erro ao ativar filme",
      error: error.message,
    });
  }
};

/* Desativa um filme (remove da visualização do sistema) */
export const deactivateMovie = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || "");

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID de filme inválido" });
    }

    const result = await movieService.deactivate(id);

    if (result === false) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }

    if (result === "already_inactive") {
      return res.status(200).json({ message: "Filme já está inativo" });
    }

    return res.status(200).json({ message: "Filme desativado com sucesso" });
  } catch (error: any) {
    console.error(`Erro ao desativar filme: ${error}`);
    return res.status(500).json({
      message: "Erro ao desativar filme",
      error: error.message,
    });
  }
};
