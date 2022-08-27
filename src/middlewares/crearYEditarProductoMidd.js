const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body('titulo').notEmpty().withMessage('Debe introducir un título'),
    body('anio').notEmpty().withMessage('Debe introducir un año'),
    body('descripcion').notEmpty().withMessage('Debe introducir una descripción'),
    body('precio').notEmpty().withMessage('Debe introducir un precio'),
    body('imagen').custom((value, { req }) => {
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