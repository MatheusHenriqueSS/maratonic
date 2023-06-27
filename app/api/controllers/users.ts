import usersRepository, { UserUpdateData } from "../repositories/users";
import { Controller, CRUD } from "./controller";
import { User } from "@prisma/client";

class UsersController extends Controller {
  public createCRUD(): CRUD {
    return new UsersCRUD();
  }
}

class UsersCRUD implements CRUD {
  getAll = async (): Promise<User[]> => {
    return await usersRepository.list();
  };

  updateById = async (
    userUpdateData: UserUpdateData,
    id: string
  ): Promise<User> => {
    return await usersRepository.updateById(id, userUpdateData);
  };

  deleteById = async (id: string): Promise<void> => {
    await usersRepository.deleteById(id);
  };
}

const usersController = new UsersController();

export default usersController;
