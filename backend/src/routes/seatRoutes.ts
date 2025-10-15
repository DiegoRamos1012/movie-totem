import { Router } from "express";
import {
  getSeatsByTheater,
  getAvailableSeatsByTheater,
  getSeatById,
  generateSeats,
  reserveSeat,
  releaseSeat,
  releaseAllSeats,
  deleteAllSeats,
} from "../controllers/SeatController";

const router = Router();

router.get("/theater/:theaterId", getSeatsByTheater); 
router.get("/theater/:theaterId/available", getAvailableSeatsByTheater); 
router.get("/:id", getSeatById); 
router.post("/generate/:theaterId", generateSeats); 
router.patch("/:id/reserve", reserveSeat); 
router.patch("/:id/release", releaseSeat); 
router.patch("/theater/:theaterId/release-all", releaseAllSeats); 
router.delete("/theater/:theaterId/delete-all", deleteAllSeats); 

export default router;