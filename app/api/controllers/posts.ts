import postsRepository, { PostUpdateData } from "../repositories/posts";
import { NextApiRequest, NextApiResponse } from "next";

interface IdQuery {
    id: string;
}

const create = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    try {
        const { authorName, title, content } = req.body;
        const post = await postsRepository.create(authorName, title, content);
        res.status(201).json(post);
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
        const posts = await postsRepository.list();
        res.status(200).json(posts);
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
        await postsRepository.deleteById(id);
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
