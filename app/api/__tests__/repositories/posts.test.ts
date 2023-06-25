import prismaMock from "../../mock";
import postsRepositories, { PostUpdateData } from "../../repositories/posts";
import { PostType } from "@prisma/client";

test("should create new post ", async () => {
  const newPost = {
    id: "382109475",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "testTitle",
    content: "testContent",
    type: PostType.POST,
    authorName: "testAuthorName",
    categories: [],
    published: true,
    authorId: "123",
    categoriesIDs: [],
  };

  prismaMock.post.create.mockResolvedValue(newPost);
  prismaMock.user.findFirst.mockResolvedValue({
    id: "123",
    name: "sucras",
    email: "sucras@mail.com",
    emailVerified: null,
    image: null,
    role: "TEACHER",
  });

  const post = await postsRepositories.create(
    "testAuthorName",
    "testTitle",
    "testContent"
  );
  expect(post.authorId).toBe("123");
  expect(post.title).toBe("testTitle");
  expect(post.content).toBe("testContent");
});

test("should list posts", async () => {
  const newPost = {
    id: "382109475",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "testTitle",
    content: "testContent",
    type: PostType.POST,
    authorId: "123",
    categories: [],
    categoriesIDs: [],
    published: true,
  };

  prismaMock.post.findMany.mockResolvedValue([newPost]);

  const posts = await postsRepositories.list();
  expect(posts.length).toBe(1);
  expect(posts[0].authorId).toBe("123");
  expect(posts[0].title).toBe("testTitle");
  expect(posts[0].content).toBe("testContent");
});

test("should delete a post", async () => {
  const newPost = {
    id: "382109475",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "testTitle",
    content: "testContent",
    type: PostType.POST,
    authorName: "testAuthorName",
    categories: [],
    categoriesIDs: [],
  };

  prismaMock.post.findMany.mockResolvedValue([newPost]);

  const postsBefore = await postsRepositories.list();
  const postToDelete = postsBefore[0];

  await postsRepositories.deleteById(postToDelete.id);

  prismaMock.post.findMany.mockResolvedValue([]);

  const postsAfter = await postsRepositories.list();
  expect(postsAfter.length).toBe(0);
});

test("should update a post", async () => {
  const newPost = {
    id: "382109475",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "testTitle",
    content: "testContent",
    type: PostType.POST,
    authorName: "testAuthorName",
    categories: [],
    categoriesIDs: [],
  };

  prismaMock.post.findMany.mockResolvedValue([newPost]);

  const postsBefore = await postsRepositories.list();
  const postToUpdate = postsBefore[0];

  const updatedPostAuthorName = "UpdatedAuthorName";
  const updatedPostTitle = "UpdatedTitle";
  const updatedPostContent = "UpdatedContent";
  const updateData: PostUpdateData = {
    authorName: updatedPostAuthorName,
    title: updatedPostTitle,
    content: updatedPostContent,
  };

  const expectedUpdatedPost = {
    id: "382109475",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "UpdatedTitle",
    content: "UpdatedContent",
    type: PostType.POST,
    authorName: "UpdatedAuthorName",
    categories: [],
    categoriesIDs: [],
  };

  prismaMock.post.update.mockResolvedValue(expectedUpdatedPost);

  const updatedPost = await postsRepositories.updateById(
    postToUpdate.id,
    updateData
  );

  expect(updatedPost.authorName).toBe(updatedPostAuthorName);
  expect(updatedPost.title).toBe(updatedPostTitle);
  expect(updatedPost.content).toBe(updatedPostContent);
});
