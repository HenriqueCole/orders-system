const crud = require("../../crud");

const ordersHandler = require("../orders/orders.handler");
const productHandler = require("../products/products.handler");

async function getOrderProducts() {
  const orderProducts = await crud.get("OrderProducts");
  return orderProducts;
}

async function getOrderProductById(OrderProductId) {
  const orderProduct = await crud.getById("OrderProducts", OrderProductId);
  return orderProduct;
}

async function createOrderProduct(data) {
  const products = await productHandler.getProducts();
  const orders = await ordersHandler.getOrders();

  const orderProduct = {
    OrderId: data.OrderId,
    ProductId: data.ProductId,
    Quantity: data.Quantity,
  };

  const order = orders.find((order) => order.id === orderProduct.OrderId);
  if (!order) {
    throw {
      Error: `Order with id ${orderProduct.OrderId} not found`,
    };
  }

  if (order.Status == "closed") {
    throw {
      Error: "You can not add products to a closed order",
    };
  }

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

  const orderProducts = await crud.get("OrderProducts");
  const orderProductExists = orderProducts.find(
    (orderProduct) =>
      orderProduct.OrderId === data.OrderId &&
      orderProduct.ProductId === data.ProductId
  );

  if (orderProductExists) {
    const newQuantity = orderProductExists.Quantity + orderProduct.Quantity;

    await crud.post("OrderProducts", orderProductExists.id, {
      Quantity: newQuantity,
      OrderId: orderProductExists.OrderId,
      ProductId: orderProductExists.ProductId,
    });

    return orderProductExists;
  }

  const savedOrderProduct = await crud.post(
    "OrderProducts",
    null,
    orderProduct
  );
  return savedOrderProduct;
}

async function removeQuantity(id, data) {
  const orderProducts = await crud.get("OrderProducts");
  const orders = await ordersHandler.getOrders();
  const products = await productHandler.getProducts();
  const orderProductById = await crud.getById("OrderProducts", id);

  const orderProduct = {
    OrderProductId: id,
    OrderId: data.OrderId,
    ProductId: data.ProductId,
    Quantity: data.Quantity,
  };

  const orderProductExists = orderProducts.find(
    (orderProduct) =>
      orderProduct.OrderId === data.OrderId &&
      orderProduct.ProductId === data.ProductId
  );

  const checkOrderProductId = orderProducts.find(
    (orderProduct) => orderProduct.id === id
  );

  if (!checkOrderProductId) {
    throw {
      Error: `OrderProduct with id ${id} not found.`,
    };
  }

  const order = orders.find((order) => order.id === orderProduct.OrderId);
  if (!order) {
    throw {
      Error: `Order with id ${orderProduct.OrderId} not found`,
    };
  }

  if (order.Status == "closed") {
    throw {
      Error: "You can not add products to a closed order",
    };
  }

  const product = products.find(
    (product) => product.id === orderProduct.ProductId
  );

  console.log("AAAAAAAAA", orderProductById);

  if (orderProductById.ProductId !== orderProduct.ProductId) {
    throw {
      Error: `The product id ${orderProduct.ProductId} does not match the product id ${orderProductById.ProductId}`,
    };
  }

  if (!product) {
    throw {
      Error: `Product with id ${orderProduct.ProductId} not found.`,
    };
  } else if (orderProduct.Quantity <= 0) {
    throw {
      Error: "Quantity must be greater than 0",
    };
  }

  const newQuantity = orderProductExists.Quantity - data.Quantity;

  if (newQuantity === 0) {
    await crud.remove("OrderProducts", orderProductExists.id);
    return orderProductExists;
  } else if (newQuantity < 0) {
    throw {
      Error: `You can not remove more products than you have in the order.`,
    };
  }

  await crud.post("OrderProducts", orderProductExists.id, {
    Quantity: newQuantity,
    OrderId: orderProductExists.OrderId,
    ProductId: orderProductExists.ProductId,
  });

  return orderProductExists;
}

module.exports = {
  createOrderProduct,
  getOrderProducts,
  removeQuantity,
  getOrderProductById,
};
