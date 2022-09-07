const { body } = require('express-validator');
const path = require('path');

module.exports = [
  body('nombre').notEmpty().isLength({ min: 2 }).withMessage('Debe introducir un nombre'),
  body('apellido').notEmpty().isLength({ min: 2 }).withMessage('Debe introducir un apellido'),
    body('email').notEmpty().withMessage('Debe introducir un correo electrónico').bail()
    .isEmail().withMessage('Debe introducir un formato de correo válido'),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('Debe introducir una contraseña de al menos 8 caracteres'),
    body('imagen').custom((value, { req }) => {
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
      
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