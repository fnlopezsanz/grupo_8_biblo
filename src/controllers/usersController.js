const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../db/productsDataBase.json');
const readJsonFile = (path) => {
  return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const usersController = {
    login: (req,res) => {
        res.render("users/login");
    },
    register: (req,res) => {
        res.render("users/register");
    },
    carrito: (req, res) => {
        res.render("users/carrito")
    }
};

module.exports = usersController;