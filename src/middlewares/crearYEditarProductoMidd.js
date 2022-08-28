const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body('titulo').trim().notEmpty().bail().withMessage('Debe introducir un título'),
    body('anio').trim().notEmpty().bail().withMessage('Debe introducir un año'),
    body('descripcion').trim().notEmpty().bail().isLength({ min: 30 }).withMessage('Debe introducir una descripción'),
    body('precio').trim().notEmpty().bail().withMessage('Debe introducir un precio'),
    body('imagen').custom((value, { req }) => {
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
      
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