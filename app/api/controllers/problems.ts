import problemsRepository, {
  ProblemUpdateData,
} from "../repositories/problems";
import { Controller, CRUD } from "./controller";
import { Problem } from "@prisma/client";

export default class ProblemsController extends Controller {
  public createCRUD(): CRUD {
    return new ProblemsCRUD();
  }
}

class ProblemsCRUD implements CRUD {
  public create = async (body: any): Promise<Problem> => {
    return await problemsRepository.create(
      body.name,
      body.link,
      body.categories
    );
  };

  public getAll = async (): Promise<Problem[]> => {
    return await problemsRepository.list();
  };

  public deleteById = async (id: string): Promise<void> => {
    await problemsRepository.deleteById(id);
  };

  public updateById = async (
    problemUpdateData: ProblemUpdateData,
    id: string
  ): Promise<Problem> => {
    return await problemsRepository.updateById(id, problemUpdateData);
  };
}
