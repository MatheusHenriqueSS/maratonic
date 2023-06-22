import prisma from "../client";

export interface PostUpdateData {
    authorName?: string;
    title?: string;
    content?: string;
}

async function create(authorName: string, title: string, content: string) {
    const postAuthor = await prisma.user.findFirst({
        where: {
            role: "TEACHER",
            name: authorName,
        },
    });

    if (postAuthor) {
        const post = await prisma.post.create({
            data: {
                author: {
                    connect: {
                        id: postAuthor.id,
                    },
                },
                title,
                content,
            },
        });

        return post;
    }

    throw new Error("Failed to find post author");
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
