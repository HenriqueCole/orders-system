const express = require("express");
const router = express.Router();

const orderProductsHandler = require("./order-products.handler");

router.post("/order-products", (req, res) => {
  orderProductsHandler
    .createOrderProduct(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
