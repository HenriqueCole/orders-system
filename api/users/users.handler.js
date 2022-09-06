const crud = require("../../crud");

async function createUser(user) {
  if (!user.Name) {
    throw {
      error: "0001",
      message: "The field Name is empty",
      necessaryFields: ["Name"],
    };
  } else if (!user.CPF) {
    throw {
      error: "0001",
      message: "The field CPF is empty",
      necessaryFields: ["CPF"],
    };
  } else if (!user.Surname) {
    throw {
      error: "0001",
      message: "The field Surname is empty",
      necessaryFields: ["Surname"],
    };
  }

  const savedUser = await crud.post("Users", null, user);
  return savedUser;
}

async function getUsers() {
  const users = await crud.get("Users");
  return users;
}

async function getUserById(id) {
  const user = await crud.getById("Users", id);
  return user;
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
