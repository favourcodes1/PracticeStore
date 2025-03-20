import express from "express";
import {
  createTicket,
  deleteTicket,
  getTicketById,
  getTickets,
  updateTicket,
} from "../controllers/ticketController.js";

const router = express.Router();
router.route("/").get(getTickets).post(createTicket);
router
  .route("/:id")
  .get(getTicketById)
  .patch(updateTicket)
  .delete(deleteTicket);

export default router;