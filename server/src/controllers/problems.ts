import { Request, Response } from "express";
import problemsRepository, { ProblemUpdateData } from "../repositories/problems";

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { link } = req.body;
        const problem = await problemsRepository.create(link);
        res.status(201).json(problem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const problems = await problemsRepository.list();
        res.status(200).json(problems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deletebyId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await problemsRepository.deleteById(id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Verificar
const updateById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const problemUpdate: ProblemUpdateData = req.body;
        const problem = await problemsRepository.updateById(id, problemUpdate);
        res.status(200).json(problem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default {
    create,
    getAll,
    updateById,
    deletebyId,
};
