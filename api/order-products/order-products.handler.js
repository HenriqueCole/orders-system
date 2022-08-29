const crud = require("../../crud");

async function createOrderProduct(orderProduct) {
  const savedOrderProduct = await crud.post(
    "OrderProducts",
    null,
    orderProduct
  );
  return savedOrderProduct;
}

module.exports = {
  createOrderProduct,
};
