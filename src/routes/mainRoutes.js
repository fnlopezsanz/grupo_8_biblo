const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController.js");

router.get("/", mainController.index);

router.get("/login", mainController.login);

router.get("/register", mainController.register);

router.get("/carrito", mainController.carrito);

router.get("/producto", mainController.detalle);

module.exports = router;