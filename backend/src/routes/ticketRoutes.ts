import { Router } from "express";
import {
  addTicket,
  deleteTicket,
  getSeatsMap,
  getTicketById,
  getTickets,
  getTicketsByScreening,
} from "../controllers/TicketController";

const router = Router();

router.get("/", getTickets);
router.get("/:id", getTicketById);
router.get("/screening/:screeningId", getTicketsByScreening);
router.get("/screening/:screeningId/seats-map", getSeatsMap);
router.post("/", addTicket);
router.delete("/:id", deleteTicket);

export default router;
