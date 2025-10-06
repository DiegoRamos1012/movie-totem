import { Router } from "express";
import {
  getTheaters,
  getTheaterById,
  addTheater,
  updateTheater,
  deactivateTheater,
} from "../controllers/TheaterController";

const router = Router();

router.get("/", getTheaters);
router.get("/:id", getTheaterById);
router.get("/", addTheater);
router.get("/:id", updateTheater);
router.get("/:id", deactivateTheater);

export default router;
