const crud = require("../../crud");

async function createProduct(product) {
  if (!product.Name) {
    throw {
      error: "0001",
      message: "The field Name is empty",
      necessaryFields: ["Name"],
    };
  } else if (!product.Price) {
    throw {
      error: "0001",
      message: "The field Price is empty",
      necessaryFields: ["Price"],
    };
  }
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
