const crud = require("../../crud");

const ordersHandler = require("../orders/orders.handler");
const productHandler = require("../products/products.handler");

async function createOrderProduct(data) {
  const products = await productHandler.getProducts();
  const orders = await ordersHandler.getOrders();

  const orderProduct = {
    OrderId: data.OrderId,
    ProductId: data.ProductId,
    Quantity: data.Quantity,
  };

  const ordersIds = orders.map((order) => order.OrderId);

  console.log(ordersIds.id);

  const product = products.find(
    (product) => product.id === orderProduct.ProductId
  );
  if (product) {
    orderProduct.Quantity = data.Quantity;
  } else {
    throw {
      Error: `Product with id ${orderProduct.ProductId} not found.`,
    };
  }
  // const savedOrderProduct = await crud.post(
  //   "OrderProducts",
  //   null,
  //   orderProduct
  // );
  // return savedOrderProduct;
}

async function getOrderProducts() {
  const orderProducts = await crud.get("OrderProducts");
  return orderProducts;
}

module.exports = {
  createOrderProduct,
  getOrderProducts,
};
