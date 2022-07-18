const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const usersController = require("../controllers/usersController.js");

let multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(__dirname, '../public/img/users');
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    let imageName = 'user-' + Date.now() + path.extname(file.originalname);
    cb(null, imageName);
    }
});

let fileUpload = multer({ storage: multerDiskStorage });

const validations = [
  body('Nombre').notEmpty().withMessage('Debe introducir un nombre'),
  body('Apellido').notEmpty().withMessage('Debe introducir un apellido'),
  body('Email').notEmpty().withMessage('Debe introducir un correo electrónico').bail()
  .isEmail().withMessage('Debe introducir un formato de correo válido'),
  body('Password').notEmpty().withMessage('Debe introducir una contraseña'),
  body('image').custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.png'];
    
    if (!file) {
      throw new Error('Debe seleccionar una imagen');
    } else {
      let fileExtension = path.extname(file.originalname);
      if(!acceptedExtensions.includes(fileExtension)) {
        throw new Error('Las extensiones de archivo permitidas son: ' + acceptedExtensions.join(', '));
      }
    }
    return true
  })
];

router.get("/login", validations, usersController.login);

router.get("/register", usersController.register);

router.post("/store", fileUpload.single('image'), validations, usersController.store);

router.get("/carrito", usersController.carrito);


module.exports = router;