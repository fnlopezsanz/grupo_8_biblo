const multer = require('multer');
const path = require('path');

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      let folder = path.join(__dirname, '../public/img/users');
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      let imageName = file.fieldname + 'user-' + Date.now() + path.extname(file.originalname);
      cb(null, imageName);
      }
  });
  
 const fileUpload = multer({ storage: multerDiskStorage });
 

 module.exports = fileUpload;
