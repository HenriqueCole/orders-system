const crud = require("../../crud");

async function createOrderProduct(orderProduct) {
  const savedOrderProduct = await crud.post(
    "OrderProducts",
    null,
    orderProduct
  );
  return savedOrderProduct;
}

async function getOrderProducts() {
  const orderProducts = await crud.get("OrderProducts");
  return orderProducts;
}

module.exports = {
  createOrderProduct,
  getOrderProducts,
};
