const { body } = require('express-validator');

module.exports = [
  body('actualPass').notEmpty().withMessage('Debe introducir la contraseña actual'),
  body('newPass').notEmpty().withMessage('Debe introducir una contraseña nueva'),
  body('confNewPass').notEmpty().withMessage('Debe introducir nuevamente la contraseña')
];