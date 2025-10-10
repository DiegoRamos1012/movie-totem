import { Router } from "express";
import {
  getTheaters,
  getTheaterById,
  addTheater,
  updateTheater,
  activateTheater,
  deactivateTheater,
} from "../controllers/TheaterController.js";

const router = Router();

/* Rotas de listagem e busca */
router.get("/", getTheaters);
router.get("/:id", getTheaterById);

/* Rotas de criação e atualização */
router.post("/", addTheater);
router.put("/:id", updateTheater);

/* Rotas de ativação/desativação */
router.patch("/:id/activate", activateTheater);
router.patch("/:id/deactivate", deactivateTheater);

export default router;
