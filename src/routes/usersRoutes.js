const express = require("express");
const router = express.Router();
const path = require('path');
const usersController = require("../controllers/usersController.js");

const fileUpload = require("../middlewares/fileUpload");
const validationRegister = require("../middlewares/validationRegister");
const validationLogin = require("../middlewares/validationLogin");



router.get("/login", usersController.login);

router.post("/login", validationLogin, usersController.processLogin);

router.get("/register", usersController.register);

router.post("/store", fileUpload.single('image'), validationRegister, usersController.store);

router.get("/carrito", usersController.carrito);


module.exports = router;