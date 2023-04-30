import { Request, Response } from "express";
import postsRepository, { PostUpdateData } from "../repositories/posts";

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { authorName, title, content } = req.body;
    const post = await postsRepository.create(authorName, title, content);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await postsRepository.list();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletebyId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await postsRepository.deleteById(id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const postUpdate: PostUpdateData = req.body;
    const post = await postsRepository.updateById(id, postUpdate);
    res.status(200).json(post);
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
