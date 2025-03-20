import express from "express";
import {
  createComment,
  deleteComment,
  getCommentById,
  getComments,
  updateComment,
  getCommentByTicketId
} from "../controllers/commentController.js";

const router = express.Router();
router.route("/").get(getComments).post(createComment);
router
  .route("/:id")
  .get(getCommentById)
  .patch(updateComment)
  .delete(deleteComment);
router.route("/getByTicketId/:ticketId")
    .get(getCommentByTicketId)

export default router;
