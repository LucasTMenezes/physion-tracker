import express from "express";
import { pool } from "./config/db";

const app = express();

app.use(express.json());

app.get("/test-db", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
});

export default app;