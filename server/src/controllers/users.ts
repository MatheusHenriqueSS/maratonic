import { Request, Response } from "express";
import usersRepository, { UserUpdateData } from "../repositories/users";

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nickname, email, passwordHash, salt } = req.body;
    const user = await usersRepository.create(
      nickname,
      email,
      passwordHash,
      salt
    );
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await usersRepository.list();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletebyId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await usersRepository.deleteById(id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateUser: UserUpdateData = req.body;
    const user = await usersRepository.updateById(id, updateUser);
    res.status(200).json(user);
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
