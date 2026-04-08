import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createProgramForUser, getProgramsByUser, updateProgram, deleteProgram } from "../controllers/programController";

const router = Router();

// makes everything bellow use authMiddleware
router.use(authMiddleware);

router.post("/", createProgramForUser);
router.get("/", getProgramsByUser);
router.put("/:id", updateProgram);
router.delete("/:id", deleteProgram);

export default router;