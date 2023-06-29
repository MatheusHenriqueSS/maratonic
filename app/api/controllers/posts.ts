import postsRepository, { PostUpdateData } from "../repositories/posts";
import { Controller, CRUD } from "./controller";
import { Post } from "@prisma/client";

export default class PostsController extends Controller {
  public createCRUD(): CRUD {
    return new PostsCRUD();
  }
}

class PostsCRUD implements CRUD {
  public create = async (body: any): Promise<Post> => {
    return await postsRepository.create(
      body.authorId,
      body.title,
      body.content,
      body.categoriesIDs
    );
  };

  public getAll = async (): Promise<Post[]> => {
    return await postsRepository.list();
  };

  public updateById = async (
    postUpdateData: PostUpdateData,
    id: string
  ): Promise<Post> => {
    return await postsRepository.updateById(id, postUpdateData);
  };

  public deleteById = async (id: string): Promise<void> => {
    await postsRepository.deleteById(id);
  };
}
