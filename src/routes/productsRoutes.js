const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController.js");

router.get("/create/", productsController.crear);

router.get("/:id", productsController.detalle);

router.get("/edit/:id", productsController.editar);

router.post("/store", productsController.store);

router.put("/:id", productsController.update);

router.delete('/:id', productsController.destroy);


module.exports = router;