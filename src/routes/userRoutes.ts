import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Access granted", user: (req as any).user });
});
router.post("/", createUser);
router.post("/login", loginUser);

export default router;