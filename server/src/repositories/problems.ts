import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ProblemUpdateData {
  link?: string;
}

async function create(link: string) {
  const problem = await prisma.problem.create({
    data: {
      link,
    },
  });
  return problem;
}

async function list() {
  const problems = await prisma.problem.findMany();
  return problems;
}

async function deleteById(id: string) {
  const problem = await prisma.problem.delete({
    where: { id },
  });
  return problem;
}

async function updateById(id: string, data: ProblemUpdateData) {
  const problem = await prisma.problem.update({
    where: { id },
    data,
  });
  return problem;
}

export default {
  create,
  list,
  deleteById,
  updateById,
};
