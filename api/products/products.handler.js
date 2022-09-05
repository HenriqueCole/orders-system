const crud = require("../../crud");

async function createProduct(product) {
  const savedProduct = await crud.post("Products", null, product);
  return savedProduct;
}

async function getProducts() {
  const products = await crud.get("Products");
  return products;
}

async function getProductById(id) {
  const product = await crud.getById("Products", id);
  return product;
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
};
