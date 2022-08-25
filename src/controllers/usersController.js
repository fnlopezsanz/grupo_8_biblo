const fs = require("fs");
const path = require("path");
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const sequelize = db.sequelize;
const { check, body, validationResult } = require('express-validator');


const usersFilePath = path.join(__dirname, '../db/users.json');
const readJsonFile = (path) => {
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

const usersController = {
  login: (req, res) => {
    res.render("users/login");
  },

  processLogin: (req, res) => {
    let errors = (validationResult(req));
    if (errors.isEmpty()) {
      db.Usuarios
        .findAll({
          where: {
            email: req.body.email
          }
        })
        .then(function (user) {
          if (user[0] != undefined) {
            let passOk = bcrypt.compareSync(req.body.password, user[0].password);
            if (passOk) {
              delete user[0].password
              req.session.userLogged = user[0]
              if (req.body.recordame) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) });
                console.log()
              }
              return res.redirect('/users/perfil')
            } else {
              return res.render('users/login', { 
                  errors: { 
                    msg: 'Usuario y/o contraseña incorrectos' } 
                }
              );
            }
          }
        });
    } else {
      return res.render('users/login', { errors: errors.mapped(), oldData: req.body });
    }

  },

  perfil: (req, res) => {
    db.Usuarios
      .findByPk(req.params.id)
      .then(function (user) {
        if (!user[0]) {
          res.render('users/noperfil')
        } else {
          res.render('users/perfil', { user: user })
        }
      })
      .catch(error => console.log(error));
  },

  register: (req, res) => {
    res.render("users/register");
  },

  store: (req, res) => {
    let errors = (validationResult(req));
    if (errors.isEmpty()) {
      db.Usuarios
        .findOne({
          where: {
            email: req.body.email
          }
        })
        .then(user => {
          if (!user[0]) {
            const userToCreate = {
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              email: req.body.email,
              id_rol: req.body.id_rol,
              password: bcrypt.hashSync(req.body.password, 10),
              avatar: req.file?.filename || 'image-default.jpg'
            }
            db.Usuarios
              .create(userToCreate)
              .then(function () {

                res.redirect('/users/login');
              })
              .catch(error => console.log(error));
          } else {
            res.render("users/register", { user })
          }
        })
    } else {
      return res.render("users/register", { errors: errors.mapped(), oldData: req.body })
    }


  },

  carrito: (req, res) => {
    res.render("carrito")
  },

  

  edit: function (req, res) {
    db.Usuarios.findByPk(req.params.id)

      .then(function (user) {

        res.render('users/editarUser', { user: user });
      })
  },

  update: function (req, res) {
    console.log("req.body.imagen");
    db.Usuarios.update({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: req.body.password,
      /*  avatar: req.file.filename,  */
    }, {
      where: {
        id: req.session.user.id
      }
    }).then(userUpdated => {
      res.redirect('/users/profile/' + req.params.id)
    })
      .catch(error => console.log(error));
  },

  editarAvatar: function (req, res) {
    db.Usuarios.findByPk(req.params.id)
      .then(function (user) {
        res.render('editarAvatar', { user: user });
      })
  },

  updateAvatar: function (req, res) {
    db.Usuarios.update({
      imagen: req.file.filename
    }, {
      where: {
        id: req.session.user.id
      }
    }).then(userUpdated => {

      res.redirect('/users/profile/' + req.params.id)
    })
      .catch(error => console.log(error));
  },

  logout: (req, res) => {
    res.clearCookie('userData');
    req.session.destroy();
    res.redirect('/')
  }

};

module.exports = usersController;



