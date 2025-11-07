import { Router } from "express";
import {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  activateMovie,
  deactivateMovie,
  deleteMovie,
} from "../controllers/MovieController.js";
import { auth } from "../middlewares/auth";

const router = Router();

/* Rotas de listagem e busca */
router.get("/", getMovies);
router.get("/:id", getMovieById);

/* Rotas de criação e atualização */
router.post("/", auth, addMovie);
router.put("/:id", auth, updateMovie);

/* Rotas de ativação/desativação */
router.patch("/:id/activate", auth, activateMovie);
router.patch("/:id/deactivate", auth, deactivateMovie);
router.delete("/:id", auth, deleteMovie);

export default router;
