import { NextApiRequest, NextApiResponse } from "next";
import categoriesRepository, {
    CategoryUpdateData,
} from "../repositories/categories";

interface IdQuery {
    id: string;
}

const create = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    try {
        const { name } = req.body;
        const category = await categoriesRepository.create(name);
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAll = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    try {
        const categories = await categoriesRepository.list();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deletebyId = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    try {
        const { id } = req.query as unknown as IdQuery;
        await categoriesRepository.deleteById(id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateById = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    try {
        const { id } = req.query as unknown as IdQuery;
        const categoryUpdate: CategoryUpdateData = req.body;
        const category = await categoriesRepository.updateById(
            id,
            categoryUpdate
        );
        res.status(200).json(category);
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
