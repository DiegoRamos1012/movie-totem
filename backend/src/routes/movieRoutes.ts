import { Router } from "express";
import { MovieController } from "../controllers/MovieController.js";

const router = Router();

router.get("/", MovieController.getMovies);
router.delete("/:id", MovieController.deleteMovie);
router.post("/", MovieController.addMovie);
router.put("/:id", MovieController.updateMovie)

export default router;
