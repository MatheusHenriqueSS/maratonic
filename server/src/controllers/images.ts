import { Request, Response } from "express";
import imagesRepository, { ImageUpdateData } from "../repositories/images";

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, bytes } = req.body;
    const image = await imagesRepository.create(name, bytes);
    res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const images = await imagesRepository.list();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletebyId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await imagesRepository.deleteById(id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const imageUpdate: ImageUpdateData = req.body;
    const image = await imagesRepository.updateById(id, imageUpdate);
    res.status(200).json(image);
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
