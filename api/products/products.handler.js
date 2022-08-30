const crud = require("../../crud");

async function createProduct(product) {
  const savedProduct = await crud.post("Products", null, product);
  return savedProduct;
}

async function getProducts() {
  const products = await crud.get("Products");
  return products;
}

module.exports = {
  createProduct,
  getProducts,
};
