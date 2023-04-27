import * as BasicCRUD from "../../repositories/basicCRUD";

export async function createUser(user: object) {
  return await BasicCRUD.insertData("user", user);
}
