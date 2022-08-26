const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body('nombre').notEmpty().withMessage('Debe introducir un nombre'),
    body('apellido').notEmpty().withMessage('Debe introducir un apellido'),
    body('email').notEmpty().withMessage('Debe introducir un correo electrónico').bail()
    .isEmail().withMessage('Debe introducir un formato de correo válido'),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('Debe introducir una contraseña válida'),
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