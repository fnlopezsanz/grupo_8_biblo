const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController.js");
const fileUploadProductos = require("../middlewares/fileUploadProductos");
const admMiddleware = require("../middlewares/admMiddleware");
const crearYEditarProductoMidd = require("../middlewares/crearYEditarProductoMidd");


router.get("/create/",admMiddleware, productsController.crear);

router.get("/:id", productsController.detalle);

router.get("/edit/:id",admMiddleware, productsController.editar);

router.post("/store",admMiddleware, crearYEditarProductoMidd, fileUploadProductos.single('imagen'), productsController.store);

router.put("/:id",admMiddleware, crearYEditarProductoMidd, fileUploadProductos.single('imagen'), productsController.update);

router.delete('/:id',admMiddleware, productsController.destroy);


module.exports = router;