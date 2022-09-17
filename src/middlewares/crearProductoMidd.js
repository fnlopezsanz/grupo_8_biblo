const { body } = require('express-validator');
const path = require('path');

module.exports = [
  body('titulo').trim().notEmpty().withMessage('Debe introducir un título'),
  body('titulo').trim().isLength({ min: 5 }).withMessage('Debe introducir un título de al menos 5 caracteres'),
  body('anio').trim().notEmpty().withMessage('Debe introducir un año'),
  body('descripcion').trim().notEmpty().isLength({ min: 20 }).withMessage('Debe introducir una descripción'),
  body('precio').trim().notEmpty().withMessage('Debe introducir un precio'),
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