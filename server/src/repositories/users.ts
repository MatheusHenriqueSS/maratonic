import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface UserUpdateData {
  nickname?: string;
  email?: string;
  passwordHash?: string;
  salt?: string;
}

async function create(
  nickname: string,
  email: string,
  passwordHash: string,
  salt: string
) {
  const user = await prisma.user.create({
    data: {
      email,
      nickname,
      passwordHash,
      salt,
    },
  });
  return user;
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
  create,
  list,
  deleteById,
  updateById,
};
