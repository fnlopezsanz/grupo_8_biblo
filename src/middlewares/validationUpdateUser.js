const { body } = require('express-validator');
const path = require('path');

module.exports = [
  body('nombre').notEmpty().withMessage('Debe introducir un nombre'),
  body('apellido').notEmpty().withMessage('Debe introducir un apellido'),
  body('email').notEmpty().withMessage('Debe introducir un correo electrónico').bail()
    .isEmail().withMessage('Debe introducir un formato de correo válido')
];