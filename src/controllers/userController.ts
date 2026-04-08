import { Request, Response } from "express";
import * as userService from "../services/userService";


export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const user = await userService.createUser(name, email, password);

        res.status(201).json(user);

    } catch (error: any) {
        if (error.message === "Email already exists") {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: "Error creating user" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const token = await userService.loginUser(email, password);

        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: "Invalid credentials" });
    }
};

