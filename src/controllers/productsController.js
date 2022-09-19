const path = require("path");
const db = require('../database/models');
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const moment = require('moment');

const productsController = {
  list: (req, res) => {
    db.Productos.findAll({
      order: [
        ['anio', 'DESC']
      ]
    })
      .then(productos => {
        return res.render('products/allbooks', { productos })
      })
  },

  find: (req, res) => {
    const titulo = req.body.buscador
    db.Productos.findAll({
      where: {
        titulo: { [Op.like]: "%" + titulo + "%" }
      }})
      .then(productos => {
        return res.render('products/result', { productos })
      })
  },

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
        .catch(error => console.log(error));
    } else {
      db.Productos.update({
        titulo: req.body.titulo,
        id_autor: req.body.id_autor,
        id_genero: req.body.id_genero,
        id_categoria: req.body.id_categoria,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
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
  },

  editarImgProd: (req, res) => {
    db.Productos
      .findByPk(req.params.id)
      .then(producto => {
        return res.render("products/editarImgProd", { producto })
      })
      .catch(error => console.log)
  },

  updateImgProd: (req, res) => {
    const resultValidation = validationResult(req);
    const idP = req.params.id
    if (!resultValidation.isEmpty()) {
      db.Productos
        .findByPk(idP)
        .then(producto => {
          return res.render("products/editarImgProd", { producto, errors: resultValidation.mapped(), oldData: req.body })
        })
    } else {
      db.Productos.update({
        imagen: req.file?.filename
      },
        {
          where: {
            id: idP
          }
        })
        .then(imagenGuardada => {
          return res.redirect("/products/" + idP)
        })
        .catch(error => console.log(error))
    }
  },

  destroy: (req, res) => {
    const id = req.params.id;
    db.Productos
      .destroy(
        {
          where: {
            id
          }
        })
      .then(function () {
        return res.redirect("/");
      })
  },

  bestsellers: (req, res) => {
    db.Productos
      .findAll()
      .then(productos => {
        const bestseller = productos.filter(product => product.id_categoria == 1)
        return res.render("products/bestsellers", { bestseller });
      })
      .catch(error => console.log(error));
  },

  lanzamientos: (req, res) => {
    db.Productos
      .findAll()
      .then(productos => {
        const nuevosLanzamientos = productos.filter(product => product.id_categoria == 3);
        return res.render("products/nuevos-lanzamientos", { nuevosLanzamientos });
      })
      .catch(error => console.log(error));
  },

  delautor: (req, res) => {
    db.Productos.findAll()
      .then(productos => {
        let idAutor = req.params.id
        const autor = db.Autores.findByPk(idAutor)
        const ebooksAutor = productos.filter(product => product.id_autor == idAutor);
        Promise.all([autor])
          .then(function ([autor]) {
            return res.render("products/del-autor", { ebooksAutor, autor })
          })
          .catch(error => console.log(error));
      })
  }
};

module.exports = productsController;