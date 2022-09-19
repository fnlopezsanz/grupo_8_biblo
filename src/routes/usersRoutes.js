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
const editUserMiddleware = require("../middlewares/editUserMiddleware");
const validationEditPassword = require("../middlewares/validationEditPassword");
const validationUpdateUser = require("../middlewares/validationUpdateUser");
const validationUpdateAvatar = require("../middlewares/validationUpdateAvatar");
const admMiddleware = require("../middlewares/admMiddleware");


router.get("/login", guestMiddleware, usersController.login);

router.post("/find", admMiddleware, usersController.find);

router.post("/login", validationLogin, usersController.processLogin);

router.get("/register", guestMiddleware, usersController.register);

router.post("/store", fileUpload.single('imagen'), validationRegister, usersController.store);

router.get("/carrito", usersController.carrito);

router.get('/perfil/:id', authMiddleware, usersController.perfil);

/*Lista de usuarios*/
router.get("/users-list", admMiddleware, usersController.userlist)

/* EDIT USUARIO */
router.get('/editarUser/:id', editUserMiddleware, usersController.edit);
router.post('/editarUser/:id', validationUpdateUser, usersController.update);
/* EDIT PASS */
router.get('/editarPass/:id', editUserMiddleware, usersController.editPass);
router.post('/editarPass/:id', validationEditPassword, usersController.updatePass);
/* EDIT AVATAR */
router.get('/editarAvatar/:id', editUserMiddleware, usersController.editarAvatar);
router.post('/editarAvatar/:id', fileUpload.single('imagen'), validationUpdateAvatar, usersController.updateAvatar);

router.get('/logout', usersController.logout);



module.exports = router;