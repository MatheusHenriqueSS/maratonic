import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export interface PostUpdateData {
    authorName?: string;
    title?: string;
    content?: string;
}

async function create(authorName: string, title: string, content: string) {
    const post = await prisma.post.create({
        data: {
            authorName,
            title,
            content,
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
        where: { id },
    });
    return post;
}

async function updateById(id: string, data: PostUpdateData) {
    const post = await prisma.post.update({
        where: { id },
        data,
    });
    return post;
}

export default {
    create,
    list,
    deleteById,
    updateById,
};
