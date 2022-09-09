const { body } = require('express-validator');

module.exports = [
    body('email').notEmpty().withMessage('Debe introducir un correo electrónico').bail(),
    body('email').isEmail().withMessage('Debe introducir un formato de correo válido'),
    body('password').notEmpty().withMessage('Debe introducir una contraseña')
  ];