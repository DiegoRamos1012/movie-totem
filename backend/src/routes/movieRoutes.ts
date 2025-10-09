import { Router } from "express";
import {
  addMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from "../controllers/MovieController.js";

const router = Router();

router.get("/", getMovies);
router.delete("/:id", deleteMovie);
router.post("/", addMovie);
router.put("/:id", updateMovie);

export default router;
