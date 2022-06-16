const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController.js");

router.get("/detail", productsController.detalle);

router.get("/create", productsController.crear);

router.post("/", productsController.guardar);

router.get("/edit", productsController.editar);

router.put("/:id", productsController.guardar);


module.exports = router;