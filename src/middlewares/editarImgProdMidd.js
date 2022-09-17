const { body } = require('express-validator');
const path = require('path');

module.exports = [
  body('imagen').custom((value, { req }) => {
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
      
      if (!file) {
        throw new Error('Debe seleccionar una imagen');
      } else {
        let fileExtension = path.extname(file.originalname).toLowerCase();
        if(!acceptedExtensions.includes(fileExtension)) {
          throw new Error('Las extensiones de archivo permitidas son: ' + acceptedExtensions.join(', '));
        }
      }
      return true
    })
  ];