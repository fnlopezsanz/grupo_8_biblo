const fs = require("fs");
const path = require("path");

const usersController = {
    login: (req,res) => {
        res.render("users/login");
    },
    register: (req,res) => {
        res.render("users/register");
    },
    carrito: (req, res) => {
        res.render("users/carrito");
    }
};

module.exports = usersController;