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

router.get("/order-products", (req, res) => {
  orderProductsHandler
    .getOrderProducts()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/order-products/:id", (req, res) => {
  orderProductsHandler
    .getOrderProductById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/order-products/:id", (req, res) => {
  orderProductsHandler
    .removeQuantity(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
