const crud = require("../../crud");

async function createUser(user) {
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
