import prisma from "../client";

export interface ImageUpdateData {
  name?: string;
  bytes?: Buffer;
}

async function create(name: string, bytes: Buffer) {
  const image = await prisma.image.create({
    data: {
      name: name,
      bytes: bytes,
    },
  });
  return image;
}

async function list() {
  const images = await prisma.image.findMany();
  return images;
}

async function deleteById(id: string) {
  const image = await prisma.image.delete({
    where: { id: id },
  });
  return image;
}

async function updateById(id: string, data: ImageUpdateData) {
  const image = await prisma.image.update({
    where: { id: id },
    data: data,
  });
  return image;
}

export default {
  create,
  list,
  deleteById,
  updateById,
};
