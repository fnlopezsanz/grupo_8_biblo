const fs = require("fs");
const path = require("path");
const db = require('../database/models');
const sequelize = db.sequelize;
const moment = require('moment');

const productsFilePath = path.join(__dirname, '../db/productsDataBase.json');
const readJsonFile = (path) => {
  return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const productsController = {
  detalle: (req, res) => {
    const products = readJsonFile(productsFilePath)
    const product = products.find(product => product.id == req.params.id)
    res.render('products/detalleProducto', { product });
  },
  crear: (req, res) => {

    db.Genero
      .findAll()
      .then(generos => {
        return res.render('products/crearProducto', { generos });
      })
      .catch(error => console.log(error));

  },
  
  store: (req, res) => {
    const products = readJsonFile(productsFilePath);
    const product = {
      id: products[products.length - 1].id + 1,
      titulo: req.body.titulo,
      autor: req.body.autor,
      genero: req.body.genero,
      categoria: req.body.categoria,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      imagen: req.file?.filename || "image-default.jpg"
    };

    products.push(product);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    return res.redirect("/");
  },
  editar: (req, res) => {
    const productsJson = readJsonFile(productsFilePath);
    const products = productsJson.find(product => product.id == req.params.id)
    res.render("products/editarProducto", { products });
  },
  update: (req, res) => {
    const products = readJsonFile(productsFilePath)
    for (let i = 0; i < products.length; i++) {
      if(products[i].id == req.params.id) {
        products[i] = {
          ...products[i],
          titulo: req.body.titulo,
          autor: req.body.autor,
          genero: req.body.genero,
          categoria: req.body.categoria,
          descripcion: req.body.descripcion,
          precio: req.body.precio
        }
      }
    };
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    return res.redirect("/");
  },
  destroy : (req, res) => {
		const products = readJsonFile(productsFilePath);
		const productosFiltrados = products.filter(product => product.id != req.params.id);

		fs.writeFileSync(productsFilePath, JSON.stringify(productosFiltrados, null, 2));
		return res.redirect("/");
	}
};

module.exports = productsController;