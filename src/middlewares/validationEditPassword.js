const { body } = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');

module.exports = [
  body('actualPass').notEmpty().withMessage('Debe introducir la contraseña actual')
  .custom((value, { req }) => {
    let actualPass = req.body.actualPass;
    if (!bcrypt.compareSync(actualPass, req.session.userLogged.password)) {
      throw new Error('Contraseña incorrecta');
    }
    return true
  }),
  body('newPass').notEmpty().withMessage('Debe introducir una contraseña nueva'),
  body('confNewPass').notEmpty().withMessage('Debe introducir nuevamente la contraseña'),
  body('confNewPass').custom((value, { req }) => {
    let newPass = req.body.newPass;
    let confNewPass = req.body.confNewPass;
    if (newPass != confNewPass) {
      throw new Error('Este campo debe coincidir con el de contraseña nueva');
    }
    return true
  })
];