import { Router } from "express";
import {
  getScreenings,
  getScreeningById,
  addScreening,
  updateScreening,
} from "../controllers/ScreeningController.js";

const router = Router();

router.get("/", getScreenings);
router.get("/:id", getScreeningById);
router.post("/", addScreening);
router.put("/:id", updateScreening);

export default router;
