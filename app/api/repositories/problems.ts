import prisma from "../client";

export interface ProblemUpdateData {
  name?: string;
  link?: string;
  categoriesIDs: string[];
}

async function create(name: string, link: string, categories: string[]) {
  const problem = await prisma.problem.create({
    data: {
      name: name,
      link: link,
      categories: categories,
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
    where: { id: id },
  });
  return problem;
}

async function updateById(id: string, data: ProblemUpdateData) {
  const problem = await prisma.problem.update({
    where: { id: id },
    data: data,
  });
  return problem;
}

export default {
  create,
  list,
  deleteById,
  updateById,
};
