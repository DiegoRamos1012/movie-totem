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

const router = Router();

/* Rotas de listagem e busca */
router.get("/", getScreenings);

/* Rotas específicas ANTES das genéricas */
router.get("/movie/:movieId", getScreeningsByMovie);

/* Rota genérica por último */
router.get("/:id", getScreeningById);

/* Rotas de criação e atualização */
router.post("/", addScreening);
router.put("/:id", updateScreening);

/* Rotas de ativação/desativação */
router.patch("/:id/activate", activateScreening);
router.patch("/:id/deactivate", deactivateScreening);

export default router;
