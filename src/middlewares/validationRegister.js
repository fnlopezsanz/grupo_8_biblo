const { body } = require('express-validator');

module.exports = [
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