const multer = require('multer');
const path = require('path');

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      let folder = path.join(__dirname, '../public/img/products');
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      let imageName = 'user-' + Date.now() + path.extname(file.originalname);
      cb(null, imageName);
      }
  });
  
 const fileUploadProductos = multer({ storage: multerDiskStorage });

 module.exports = fileUploadProductos;