import { Router } from "express";
import { MovieController } from "../controllers/MovieController.js";

const router = Router()

router.get("/", MovieController.getMovies);
router.get("/:id", MovieController.deleteMovie)

export default router;