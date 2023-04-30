import { Request, Response } from "express";
import categoriesRepository, {
  CategoryUpdateData,
} from "../repositories/categories";

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const category = await categoriesRepository.create(name);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await categoriesRepository.list();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletebyId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await categoriesRepository.deleteById(id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const categoryUpdate: CategoryUpdateData = req.body;
    const category = await categoriesRepository.updateById(id, categoryUpdate);
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
