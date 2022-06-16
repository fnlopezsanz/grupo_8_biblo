const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController.js");

router.get("/login", usersController.login);

router.get("/register", usersController.register);

router.get("/carrito", usersController.carrito);


module.exports = router;