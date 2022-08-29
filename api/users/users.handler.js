const crud = require("../../crud");

async function createUser(user) {
  const savedUser = await crud.post("Users", null, user);
  return savedUser;
}

async function getUsers() {
  const users = await crud.get("Users");
  return users;
}

module.exports = {
  createUser,
  getUsers,
};
