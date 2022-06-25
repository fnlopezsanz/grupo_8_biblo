const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController.js");

router.get("/detail/:id", productsController.detalle);

router.get("/create", productsController.crear);

router.post("/", productsController.store);

router.get("/edit/:id", productsController.editar);

router.put("/:id", productsController.update);


module.exports = router;