import prisma from "../client";

export interface PostUpdateData {
  authorName?: string;
  title?: string;
  content?: string;
  categoriesIDs: string[];
}

async function create(
  authorId: string,
  title: string,
  content: string,
  categories: string[]
) {
  const post = await prisma.post.create({
    data: {
      authorId: authorId,
      title: title,
      content: content,
      categories: categories,
    },
  });

  return post;
}

async function list() {
  const posts = await prisma.post.findMany();
  return posts;
}

async function deleteById(id: string) {
  const post = await prisma.post.delete({
    where: { id: id },
  });
  return post;
}

async function updateById(id: string, data: PostUpdateData) {
  const post = await prisma.post.update({
    where: { id: id },
    data: data,
  });
  return post;
}

export default {
  create,
  list,
  deleteById,
  updateById,
};
