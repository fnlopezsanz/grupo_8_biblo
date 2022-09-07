const { body } = require('express-validator');

module.exports = [
  body('nombre').notEmpty().isLength({ min: 2 }).withMessage('Debe introducir un nombre'),
  body('apellido').notEmpty().isLength({ min: 2 }).withMessage('Debe introducir un apellido'),
  body('email').notEmpty().withMessage('Debe introducir un correo electrónico').bail()
    .isEmail().withMessage('Debe introducir un formato de correo válido')
];