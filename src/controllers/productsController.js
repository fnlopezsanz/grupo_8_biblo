const fs = require("fs");
const path = require("path");
const db = require('../database/models');
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;
const moment = require('moment');

const productsFilePath = path.join(__dirname, '../db/productsDataBase.json');
const readJsonFile = (path) => {
  return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const productsController = {
  detalle: (req, res) => {
    db.Productos
      .findByPk(req.params.id)
      .then(producto => {
        let pedidoGeneros = db.Generos.findAll()

        let pedidoAutores = db.Autores.findAll()

        Promise.all([pedidoAutores, pedidoGeneros])
          .then(function ([autores, generos]) {
            return res.render("products/detalleProducto", { autores, generos, producto })
          })
          .catch(error => console.log(error));

      })
      .catch(error => console.log)
  },
  crear: (req, res) => {

    let pedidoGeneros = db.Generos.findAll()

    let pedidoAutores = db.Autores.findAll()

    let pedidoCategorias = db.Categorias.findAll()

    Promise.all([pedidoAutores, pedidoGeneros, pedidoCategorias])
      .then(function ([autores, generos, categorias]) {
        res.render("products/crearProducto", { autores, generos, categorias })
      })
      .catch(error => console.log(error));

  },

  store: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.isEmpty()) {
      db.Productos.create({
        titulo: req.body.titulo,
        id_autor: req.body.id_autor,
        id_genero: req.body.id_genero,
        id_categoria: req.body.id_categoria,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: req.file?.filename,
        anio: req.body.anio
      })
        .then(productoGuardado => {
          return res.redirect("/")
        })
        .catch(error => console.log(error));
    } else {
      let pedidoGeneros = db.Generos.findAll()

      let pedidoAutores = db.Autores.findAll()

      let pedidoCategorias = db.Categorias.findAll()

      Promise.all([pedidoAutores, pedidoGeneros, pedidoCategorias])
        .then(function ([autores, generos, categorias]) {
          console.log(resultValidation)
          res.render("products/crearProducto", { autores, generos, categorias, errors: resultValidation.mapped(), oldData: req.body })
        })
        .catch(error => console.log(error));
    }
  },

  editar: (req, res) => {
    db.Productos
      .findByPk(req.params.id)
      .then(producto => {
        let pedidoGeneros = db.Generos.findAll()

        let pedidoAutores = db.Autores.findAll()

        let pedidoCategorias = db.Categorias.findAll()

        Promise.all([pedidoAutores, pedidoGeneros, pedidoCategorias])
          .then(function ([autores, generos, categorias]) {
            res.render("products/editarProducto", { autores, generos, categorias, producto })
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log)
  },
  update: (req, res) => {
    const resultValidation = validationResult(req);
    const idProducto = req.params.id
    if (!resultValidation.isEmpty()) {
      db.Productos
        .findByPk(idProducto)
        .then(producto => {
          let pedidoGeneros = db.Generos.findAll()

          let pedidoAutores = db.Autores.findAll()

          let pedidoCategorias = db.Categorias.findAll()

          Promise.all([pedidoAutores, pedidoGeneros, pedidoCategorias])
            .then(function ([autores, generos, categorias]) {
              res.render("products/editarProducto", { autores, generos, categorias, producto, errors: resultValidation.mapped(), oldData: req.body })
            })
            .catch(error => console.log(error));
        })
    } else {
      db.Productos.update({
        titulo: req.body.titulo,
        id_autor: req.body.id_autor,
        id_genero: req.body.id_genero,
        id_categoria: req.body.id_categoria,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: req.file.filename,
        anio: req.body.anio
      }, {
        where: {
          id: idProducto
        }
      })
        .then(productoGuardado => {
          return res.redirect("/products/" + idProducto)
        })
        .catch(error => console.log(error));
    }

    // const products = readJsonFile(productsFilePath)
    // for (let i = 0; i < products.length; i++) {
    //   if (products[i].id == req.params.id) {
    //     products[i] = {
    //       ...products[i],
    //       titulo: req.body.titulo,
    //       autor: req.body.autor,
    //       genero: req.body.genero,
    //       categoria: req.body.categoria,
    //       descripcion: req.body.descripcion,
    //       precio: req.body.precio
    //     }
    //   }
    // };
    // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    // return res.redirect("/");
  },
  destroy: (req, res) => {
    const id = req.params.id;
        db.Productos
        .destroy(
          { where: {
             id 
            }
        })
        .then(function(){
            return res.redirect("/");
        })


    // const products = readJsonFile(productsFilePath);
    // const productosFiltrados = products.filter(product => product.id != req.params.id);

    // fs.writeFileSync(productsFilePath, JSON.stringify(productosFiltrados, null, 2));
    // return res.redirect("/");
  }
};

module.exports = productsController;