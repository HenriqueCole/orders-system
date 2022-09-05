const express = require("express");
const router = express.Router();

const productsHandler = require("./products.handler");

router.post("/products", (req, res) => {
  productsHandler
    .createProduct(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/products", (req, res) => {
  productsHandler
    .getProducts()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/products/:id", (req, res) => {
  productsHandler
    .getProductById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
