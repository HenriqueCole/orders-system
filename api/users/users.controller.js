const express = require("express");
const router = express.Router();

const usersHandler = require("./users.handler");

router.post("/users", (req, res) => {
  usersHandler
    .createUser(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/users", (req, res) => {
  usersHandler
    .getUsers()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
