import prismaMock from "../../mock";
import usersRepositories, { UserUpdateData } from "../../repositories/users";
import { UserRole } from "@prisma/client";

test("should list users", async () => {
  const newUser = {
    id: "943216785",
    email: "test@email.com",
    passwordHash: "fakeHash",
    salt: "fakeSalt",
    nickname: "testNickname",
    role: UserRole.STUDENT,
  };

  prismaMock.user.findMany.mockResolvedValue([newUser]);

  const users = await usersRepositories.list();
  expect(users.length).toBe(1);
  expect(users[0].nickname).toBe("testNickname");
  expect(users[0].email).toBe("test@email.com");
});

test("should delete a user", async () => {
  const newUser = {
    id: "943216785",
    email: "test@email.com",
    passwordHash: "fakeHash",
    salt: "fakeSalt",
    nickname: "testNickname",
    role: UserRole.STUDENT,
  };

  prismaMock.user.findMany.mockResolvedValue([newUser]);

  const usersBefore = await usersRepositories.list();
  const userToDelete = usersBefore[0];

  await usersRepositories.deleteById(userToDelete.id);

  prismaMock.user.findMany.mockResolvedValue([]);

  const usersAfter = await usersRepositories.list();
  expect(usersAfter.length).toBe(0);
});

test("should update a user", async () => {
  const newUser = {
    id: "943216785",
    email: "test@email.com",
    passwordHash: "fakeHash",
    salt: "fakeSalt",
    nickname: "testNickname",
    role: UserRole.STUDENT,
  };

  prismaMock.user.findMany.mockResolvedValue([newUser]);

  const usersBefore = await usersRepositories.list();
  const userToUpdate = usersBefore[0];

  const updatedUserNickname = "UpdatedUser";
  const updatedUserEmail = "UpdatedUser@email.com";
  const updatedUserPasswordHash = "UpdatedHash";
  const updatedSalt = "UpdatedeSalt";
  const updateData: UserUpdateData = {
    nickname: updatedUserNickname,
    email: "UpdatedUser@email.com",
    passwordHash: "UpdatedHash",
    salt: "UpdatedSalt",
  };

  const expectedUpdatedUser = {
    id: "943216785",
    email: "UpdatedUser@email.com",
    passwordHash: "UpdatedHash",
    salt: "UpdatedeSalt",
    nickname: "UpdatedUser",
    role: UserRole.STUDENT,
  };

  prismaMock.user.update.mockResolvedValue(expectedUpdatedUser);

  const updatedUser = await usersRepositories.updateById(
    userToUpdate.id,
    updateData
  );

  expect(updatedUser.nickname).toBe(updatedUserNickname);
  expect(updatedUser.email).toBe(updatedUserEmail);
  expect(updatedUser.passwordHash).toBe(updatedUserPasswordHash);
  expect(updatedUser.salt).toBe(updatedSalt);
});
