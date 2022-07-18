const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, '../db/users.json');
const readJsonFile = (path) => {
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const usersController = {
  login: (req, res) => {
    res.render("users/login");
  },

  processLogin: (req, res) => {
    
  },

  register: (req, res) => {
    res.render("users/register");
  },

  store: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render('users/register', {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }

    const users = readJsonFile(usersFilePath);
    const user = {
      id: users[users.length - 1].id + 1,
      firstname: req.body.Nombre,
      lastname: req.body.Apellido,
      email: req.body.Email,
      password: bcrypt.hashSync(req.body.Password, 10),
      image: req.file?.filename || "image-default.jpg"
    };
    users.push(user);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    return res.redirect("/")
  },

  carrito: (req, res) => {
    res.render("users/carrito")
  }
};

module.exports = usersController;
