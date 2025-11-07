import { Router } from "express";
import {
  getScreenings,
  getScreeningById,
  addScreening,
  updateScreening,
  activateScreening,
  deactivateScreening,
  getScreeningsByMovie,
} from "../controllers/ScreeningController.js";
import { auth } from "../middlewares/auth";

const router = Router();

/* Rotas de listagem e busca */
router.get("/", getScreenings);

/* Rotas específicas ANTES das genéricas */
router.get("/movie/:movieId", getScreeningsByMovie);

/* Rota genérica por último */
router.get("/:id", getScreeningById);

/* Rotas de criação e atualização */
router.post("/", auth, addScreening);
router.put("/:id", auth, updateScreening);

/* Rotas de ativação/desativação */
router.patch("/:id/activate", auth, activateScreening);
router.patch("/:id/deactivate", auth, deactivateScreening);

export default router;
