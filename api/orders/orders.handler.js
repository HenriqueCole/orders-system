const crud = require("../../crud");

async function createOrder(data) {
  const order = {
    Number: data.Number,
    UserId: data.UserId,
    Status: "open",
  };

  const savedOrder = await crud.post("Orders", null, order);
  return savedOrder;
}

async function getOrders() {
  const orders = await crud.get("Orders");
  return orders;
}

async function updateStatus(OrderId, Status) {
  const order = {
    OrderId: OrderId,
    Status: Status,
  };

  const updatedOrder = await crud.post("Orders", OrderId, order);
  return updatedOrder;
}

module.exports = {
  createOrder,
  getOrders,
  updateStatus,
};
