const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController.js");
const fileUploadProductos = require("../middlewares/fileUploadProductos");
const admMiddleware = require("../middlewares/admMiddleware");
const crearYEditarProductoMidd = require("../middlewares/crearYEditarProductoMidd");



router.get("/bestsellers", productsController.bestsellers)

router.get("/nuevos-lanzamientos", productsController.lanzamientos)

router.get("/del-autor/:id", productsController.delautor)

router.get("/create/",admMiddleware, productsController.crear);

router.get("/:id", productsController.detalle);

router.post("/store", fileUploadProductos.single('imagen'), admMiddleware, crearYEditarProductoMidd, productsController.store);

router.get("/edit/:id",admMiddleware, productsController.editar);

router.put("/:id", fileUploadProductos.single('imagen'), admMiddleware, crearYEditarProductoMidd,  productsController.update);

router.delete('/:id',admMiddleware, productsController.destroy);


module.exports = router;