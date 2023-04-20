import * as BasicCRUD from "../../repositories/basicCRUD";

export async function createUser(user: any) {
  return await BasicCRUD.insertData("user", user);
}
