const express = require("express");
const router = express.Router();

const ordersHandler = require("./orders.handler");

router.post("/orders", (req, res) => {
  ordersHandler
    .createOrder(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/orders", (req, res) => {
  ordersHandler
    .getOrders()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/orders/:id", (req, res) => {
  ordersHandler
    .updateStatus(req.params.id, req.body.Status)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
