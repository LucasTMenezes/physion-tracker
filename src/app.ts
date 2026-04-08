import express from "express";

import userRoutes from "./routes/userRoutes";
import programRoutes from "./routes/programRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/programs", programRoutes)


export default app;