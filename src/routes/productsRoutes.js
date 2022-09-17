const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController.js");
const fileUploadProductos = require("../middlewares/fileUploadProductos");
const admMiddleware = require("../middlewares/admMiddleware");
const crearProductoMidd = require("../middlewares/crearProductoMidd");
const editarProductoMidd = require("../middlewares/editarProductoMidd");
const editarImgProdMidd = require("../middlewares/editarImgProdMidd.js");


router.get("/allbooks", productsController.list)

router.get("/bestsellers", productsController.bestsellers)

router.get("/nuevos-lanzamientos", productsController.lanzamientos)

router.get("/del-autor/:id", productsController.delautor)

router.get("/create/",admMiddleware, productsController.crear);

router.get("/:id", productsController.detalle);

router.post("/store", fileUploadProductos.single('imagen'), admMiddleware, crearProductoMidd, productsController.store);

router.get("/edit/:id",admMiddleware, productsController.editar);

router.put("/:id", admMiddleware, editarProductoMidd, productsController.update);

router.get('/editarImgProd/:id', admMiddleware, productsController.editarImgProd);

router.post('/editarImgProd/:id', fileUploadProductos.single('imagen'), admMiddleware, editarImgProdMidd, productsController.updateImgProd);

router.delete('/:id',admMiddleware, productsController.destroy);


module.exports = router;