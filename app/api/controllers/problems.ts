import { NextApiRequest, NextApiResponse } from "next";
import problemsRepository, {
  ProblemUpdateData,
} from "../repositories/problems";

interface IdQuery {
  id: string;
}

const create = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { link } = req.body;
    const problem = await problemsRepository.create(link);
    res.status(201).json(problem);
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
    const problems = await problemsRepository.list();
    res.status(200).json(problems);
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
    await problemsRepository.deleteById(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Verificar
const updateById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { id } = req.query as unknown as IdQuery;
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
