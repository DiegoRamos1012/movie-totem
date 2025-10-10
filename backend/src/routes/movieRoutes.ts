import { Router } from "express";
import {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  activateMovie,
  deactivateMovie,
} from "../controllers/MovieController.js";

const router = Router();

/* Rotas de listagem e busca */
router.get("/", getMovies);
router.get("/:id", getMovieById);

/* Rotas de criação e atualização */
router.post("/", addMovie);
router.put("/:id", updateMovie);

/* Rotas de ativação/desativação */
router.patch("/:id/activate", activateMovie);
router.patch("/:id/deactivate", deactivateMovie);

export default router;
