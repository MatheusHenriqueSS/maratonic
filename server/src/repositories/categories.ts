import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface CategoryUpdateData {
  name?: string;
}

async function create(name: string) {
  const category = await prisma.category.create({
    data: {
      name,
    },
  });
  return category;
}

async function list() {
  const categories = await prisma.category.findMany();
  return categories;
}

async function deleteById(id: string) {
  const category = await prisma.category.delete({
    where: { id },
  });
  return category;
}

async function updateById(id: string, data: CategoryUpdateData) {
  const category = await prisma.category.update({
    where: { id },
    data,
  });
  return category;
}

export default {
  create,
  list,
  deleteById,
  updateById,
};
