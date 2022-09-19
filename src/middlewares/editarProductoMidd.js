const { body } = require('express-validator');
const path = require('path');

module.exports = [
  body('titulo').notEmpty().withMessage('Debe introducir un título'),
  body('titulo').isLength({ min: 5 }).withMessage('Debe introducir un título de al menos 5 caracteres'),
  body('anio').notEmpty().withMessage('Debe introducir un año'),
  body('descripcion').notEmpty().isLength({ min: 20 }).withMessage('Debe introducir una descripción'),
  body('precio').notEmpty().withMessage('Debe introducir un precio')
  ];