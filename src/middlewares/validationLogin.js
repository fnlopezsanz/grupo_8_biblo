const { body } = require('express-validator');

module.exports = [
    body('Email').notEmpty().withMessage('Debe introducir un correo electrónico').bail()
    .isEmail().withMessage('Debe introducir un formato de correo válido'),
    body('Password').notEmpty().withMessage('Debe introducir una contraseña')
  ];