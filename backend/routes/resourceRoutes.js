import express from "express";
import {
  createResource,
  deleteResource,
  getResourceById,
  getResources,
  updateResource,
  getResourcesByTicket
} from "../controllers/resourceController.js";

const router = express.Router();
router.route("/").get(getResources).post(createResource);
router
  .route("/:id")
  .get(getResourceById)
  .patch(updateResource)
  .delete(deleteResource);
router.route("/getByTicket/:ticketId")
  .get(getResourcesByTicket);

export default router;
