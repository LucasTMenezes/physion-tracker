import express from "express";
import { pool } from "./config/db";

import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);


export default app;