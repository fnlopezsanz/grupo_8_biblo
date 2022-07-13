const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

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

const usersController = require("../controllers/usersController.js");

router.get("/login", usersController.login);

router.get("/register", usersController.register);

router.post("/store", fileUpload.single('image'), usersController.store);

router.get("/carrito", usersController.carrito);


module.exports = router;