import prisma from "../client";

export interface UserUpdateData {
  nickname?: string;
  email?: string;
  passwordHash?: string;
  salt?: string;
}

async function list() {
  const users = await prisma.user.findMany();
  return users;
}

async function deleteById(id: string) {
  const user = await prisma.user.delete({
    where: { id },
  });
  return user;
}

async function updateById(id: string, data: UserUpdateData) {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return user;
}

export default {
  list,
  deleteById,
  updateById,
};
