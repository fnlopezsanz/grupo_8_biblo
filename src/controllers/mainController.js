const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../db/productsDataBase.json');
const readJsonFile = (path) => {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

const controller = {
    index: (req, res) => {
        const products = readJsonFile(productsFilePath);
        const bestseller = products.filter(product => product.categoria == "bestsellers").slice(0, 6);
        const nuevosLanzamientos = products.filter(product => product.categoria == "nuevos-lanzamientos").slice(0, 6);

        res.render("home", { bestseller, nuevosLanzamientos, products });
    }
};

module.exports = controller;