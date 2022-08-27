const fs = require("fs");
const path = require("path");
const db = require('../database/models');
const sequelize = db.sequelize;

const productsFilePath = path.join(__dirname, '../db/productsDataBase.json');
const readJsonFile = (path) => {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

const controller = {
    index: (req, res) => {
        db.Productos
        .findAll()
        .then(productos => {
            const bestseller = productos.filter(product => product.id_categoria == 1).slice(0, 6);
            const nuevosLanzamientos = productos.filter(product => product.id_categoria == 3).slice(0, 6);
            return res.render("home", { bestseller, nuevosLanzamientos, productos });
        })
        .catch(error => console.log(error))


        // const products = readJsonFile(productsFilePath);
        // const bestseller = products.filter(product => product.categoria == "bestsellers").slice(0, 6);
        // const nuevosLanzamientos = products.filter(product => product.categoria == "nuevos-lanzamientos").slice(0, 6);

        // res.render("home", { bestseller, nuevosLanzamientos, products });
    }
};

module.exports = controller;