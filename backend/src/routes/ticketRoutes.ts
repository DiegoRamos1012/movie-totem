import { Router } from "express";
import {
  addTicket,
  deleteTicket,
  getTicketById,
  getTickets,
  getTicketsByScreening,
} from "../controllers/TicketController";

const router = Router();

router.get("/", getTickets);
router.get("/:id", getTicketById);
router.get("/screening/:screeningId", getTicketsByScreening);
router.post("/", addTicket);
router.delete("/:id", deleteTicket);

export default router;
