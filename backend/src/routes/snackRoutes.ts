import { Router } from "express";
import {
  getSnacks,
  getSnackById,
  addSnack,
  updateSnack,
  deactivateSnack,
  activateSnack,
  updateSnackStock,
  purchaseSnack,
} from "../controllers/SnackController.js";

const router = Router();

router.get("/", getSnacks);
router.get("/:id", getSnackById);
router.post("/", addSnack);
router.put("/:id", updateSnack);
router.patch("/:id/deactivate", deactivateSnack);
router.patch("/:id/activate", activateSnack);
router.patch("/:id/stock", updateSnackStock);
router.post("/:id/purchase", purchaseSnack);

export default router;
