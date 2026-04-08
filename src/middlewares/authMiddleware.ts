import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token not provided" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({ error: "Invalid token format" });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token as string, env.JWT_SECRET);
        (req as any).user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};