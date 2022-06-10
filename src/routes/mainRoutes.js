const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController.js");

router.get("/", mainController.index);

router.get("/login", mainController.login);

router.get("/register", mainController.register);

router.get("/carrito", mainController.carrito);

router.get("/detalleProducto", mainController.detalle);

router.get("/crearProducto", mainController.crear);

router.post("/crearProducto", mainController.guardar);

router.get("/editarProducto", mainController.editar);

router.post("/editarProducto", mainController.guardar);


module.exports = router;