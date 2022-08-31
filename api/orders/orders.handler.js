const crud = require("../../crud");
const usersHandler = require("../users/users.handler");

async function createOrder(data) {
  const users = await usersHandler.getUsers();
  const orders = await getOrders();

  const order = {
    Number: 0,
    UserId: data.UserId,
  };

  const user = users.find((user) => user.id === order.UserId);

  if (!user) {
    throw {
      Error: `User with id ${order.UserId} not found`,
    };
  }

  console.log("USER:", user);
  const orderUser = orders.filter((order) => user.id === order.UserId);

  console.log(order);

  console.log("AAAAAAAA", orderUser);

  for (let order of orderUser) {
    if (order.Status == "open") {
      throw {
        Error: "You can not create another order when you have an open order",
      };
    }
  }

  if (orderUser) {
    order.Number = orderUser.length + 1;
  }

  order.Status = "open";

  const savedOrder = await crud.post("Orders", null, order);
  return savedOrder;
}

async function getOrders() {
  const orders = await crud.get("Orders");
  return orders;
}

async function updateStatus(OrderId) {
  for (let order of await getOrders()) {
    if (order.id == OrderId) {
      order.Status = "closed";
      delete order.id;
      const savedOrder = await crud.post("Orders", OrderId, order);
      return savedOrder;
    }
  }
  throw {
    Error: `Order with id ${OrderId} not found`,
  };
}

module.exports = {
  createOrder,
  getOrders,
  updateStatus,
};
