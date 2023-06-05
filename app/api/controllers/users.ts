import { NextApiRequest, NextApiResponse } from "next";
import usersRepository, { UserUpdateData } from "../repositories/users";

interface IdQuery {
    id: string;
}

const create = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
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

const getAll = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    try {
        const users = await usersRepository.list();
        res.status(200).json(users);
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
        await usersRepository.deleteById(id);
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
