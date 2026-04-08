import { Request, Response } from "express"
import * as programService from "../services/programService";

export const createProgramForUser = async (req: Request, res: Response) => {

    try {
        const userId = (req as any).user.userId;
        const { name, description } = req.body;

        if (!userId || !name) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const program = await programService.createProgramForUser(userId, name, description)

        res.status(201).json(program);

    } catch (error: any) {
        if (error.message === "Program already exists") {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: "Error creating program" });
    }
};

export const getProgramsByUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const programs = await programService.getProgramsByUser(userId);

        return res.status(200).json(programs);

    } catch (error: any) {
        return res.status(500).json({ error: "Error getting programs" })
    }
}

export const updateProgram = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const programId = Number(req.params.id);
        const { name, description } = req.body;

        const updatedProgram = await programService.updateProgram(userId, programId, name, description);

        return res.status(200).json(updatedProgram);

    } catch (error: any) {
        if (error.message === "Program not found") {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Error updating program" });
    }
};

export const deleteProgram = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const programId = Number(req.params.id);
        
        const deleted = await programService.deleteProgram(userId, programId);

        return res.status(204).send();

    } catch (error: any) {
        if (error.message === "Program not found") {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Error deleting program" });

    }
};