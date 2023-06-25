import imagesRepository, { ImageUpdateData } from "../repositories/images";
import { NextApiRequest, NextApiResponse } from "next";

interface IdQuery {
  id: string;
}

const create = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { name, bytes } = req.body;
    const image = await imagesRepository.create(name, bytes);
    res.status(201).json(image);
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
    const images = await imagesRepository.list();
    res.status(200).json(images);
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
    await imagesRepository.deleteById(id);
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
