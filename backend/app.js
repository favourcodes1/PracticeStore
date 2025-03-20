import express from "express";
import ticketRouter from "./routes/ticketRoutes.js";

import resourceRouter from "./routes/resourceRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(cors());

dotenv.config({ path: "./.env" });
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/api/v1/tickets", ticketRouter);
app.use("/api/v1/resources", resourceRouter);
app.use("/api/v1/comments", commentRouter);

export default app;
