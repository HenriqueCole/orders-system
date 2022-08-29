const express = require("express");
const app = express();

app.use(express.json());

const orderProductsRoute = require("./api/order-products/order-products.controller");
const ordersRoute = require("./api/orders/orders.controller");
const productsRoute = require("./api/products/products.controller");
const usersRoute = require("./api/users/users.controller");

app.use("/api", orderProductsRoute);
app.use("/api", ordersRoute);
app.use("/api", productsRoute);
app.use("/api", usersRoute);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
