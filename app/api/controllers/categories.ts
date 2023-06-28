import categoriesRepository, {
  CategoryUpdateData,
} from "../repositories/categories";
import { Controller, CRUD } from "./controller";
import { Category } from "@prisma/client";

export default class CategoriesController extends Controller {
  public createCRUD(): CRUD {
    return new CategoriesCRUD();
  }
}

class CategoriesCRUD implements CRUD {
  public create = async (body: any): Promise<Category> => {
    return await categoriesRepository.create(body.name);
  };

  public getAll = async (): Promise<Category[]> => {
    return await categoriesRepository.list();
  };

  public updateById = async (
    categoryUpdate: CategoryUpdateData,
    id: string
  ): Promise<Category> => {
    return await categoriesRepository.updateById(id, categoryUpdate);
  };

  public deleteById = async (id: string): Promise<void> => {
    await categoriesRepository.deleteById(id);
  };
}
