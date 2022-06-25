const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../db/productsDataBase.json'); 
const readJsonFile = (path) => {     
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}   

const controller = {
    index: (req,res) => {
    const products = readJsonFile(productsFilePath);
       res.render("home", { products });
    }
};

module.exports = controller;