const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, '../db/users.json');
const readJsonFile = (path) => {
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

const usersController = {
    login: (req,res) => {
        res.render("users/login");
    },

    register: (req,res) => {
        res.render("users/register");
    },

    store: (req, res) => {
    const users = readJsonFile(usersFilePath);
    const user = {
      id: users[users.length - 1].id + 1,
      firstname: req.body.nombre,
      lastname: req.body.apellido,
      email: req.body.email,
      password: req.body.contraseña,
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
