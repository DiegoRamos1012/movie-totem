import Router from "express";
import {
  getSeatsByTheater,
  getAvailableSeatsByTheater,
  getSeatById,
  generateSeats,
  reserveSeat,
  releaseSeat,
  releaseAllSeats,
} from "../controllers/SeatController";

const router = Router();

router.get("/", getSeatsByTheater);
router.get("/getAvailableSeats", getAvailableSeatsByTheater);
router.get("/:id/getSeatById", getSeatById);
router.post("/", generateSeats);
router.patch("/:id/reserveSeat", reserveSeat);
router.patch("/id/releaseSeat", releaseSeat);
router.put("/:id", releaseAllSeats)