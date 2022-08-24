const express = require("express");
const router = express.Router();
const path = require('path');
const { body } = require('express-validator');

const usersController = require("../controllers/usersController.js");

const fileUpload = require("../middlewares/fileUpload");
const validationRegister = require("../middlewares/validationRegister");
const validationLogin = require("../middlewares/validationLogin");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");



router.get("/login", guestMiddleware, usersController.login);

router.post("/login", validationLogin, usersController.processLogin);

router.get("/register", guestMiddleware, usersController.register);

router.post("/store", fileUpload.single('avatar'), validationRegister, usersController.store);

router.get("/carrito", usersController.carrito);

router.get('/perfil/:id', authMiddleware, usersController.perfil);

/* EDIT USUARIO */
router.get('/editarUser/:id', usersController.edit);
router.post('/editarUser/:id', fileUpload.single('avatar'), usersController.update);
/* EDIT AVATAR */
router.get('/editarAvatar/:id', usersController.editarAvatar);
router.post('/editarAvatar/:id', fileUpload.single('avatar'), usersController.updateAvatar);

router.get('/logout', usersController.logout);



module.exports = router;