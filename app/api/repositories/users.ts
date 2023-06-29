import prisma from "../client";

export interface UserUpdateData {
  name?: string;
  problemsSolvedIds?: String[];
  problemsTriedIds?: String[];
}

async function list() {
  const users = await prisma.user.findMany();
  return users;
}

async function deleteById(id: string) {
  const user = await prisma.user.delete({
    where: { id: id },
  });
  return user;
}

async function updateById(id: string, data: UserUpdateData) {
  const user = await prisma.user.update({
    where: { id: id },
    data: data,
  });
  return user;
}

export default {
  list,
  deleteById,
  updateById,
};
