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
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/login", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    // BUSCA USUARIOS POR MAIL
    db.Usuarios.findOne({
          where: { email: req.body.email }
        })
          .then((userInDb) => {
          // VALIDACION MAIL EN DB
            if (userInDb == null) {
              let mensajeError = "Usuario y/o contraseña incorrectos";
              res.render("users/login", { mensajeError });
            } else if (
              userInDb.id != undefined &&
              bcrypt.compareSync(req.body.password, userInDb.password)
            ) { //LOGUEO EXITOSO
              req.session.userLogged = userInDb;
              // (si el checkbox de recordar usuario no está tildado, debería llegar como "undefined")
              if (req.body.recordame != undefined) {
                res.cookie('recordame',
                  userInDb.id,
                  { maxAge: 6000000 })
              }
              res.redirect("/");
            } else {
              // LOGUEO ERRONEO
              let mensajeError = "Usuario y/o contraseña incorrectos";
              res.render("users/login", { mensajeError });
            }
          })
      .catch((error) => res.send(error));
  },
/* 

            let passOk = bcrypt.compareSync(req.body.password, user[0].password);
            if (passOk) {
              delete user[0].password
              req.session.userLogged = user[0]
              if (req.body.recordame) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) });
                console.log()
              }
              return res.redirect('/')
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

  }, */

  perfil: (req, res) => {
    db.Usuarios
      .findByPk(req.params.id)
      .then(function (user) {
        if (!user) {
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
    const resultValidation = validationResult(req);
    if (resultValidation.isEmpty()) {
      db.Usuarios
        .findOne({
          where: {
            email: req.body.email
          }
        })
        .then(user => {
          if (!user) {
            const userToCreate = {
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              email: req.body.email,
              id_rol: 1,
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
            let mensajeError = "Este email ya se encuentra registrado"
            res.render("users/register", { mensajeError })
          }
        })
    } else {
      return res.render("users/register", { errors: resultValidation.mapped(), oldData: req.body })
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
      // password: req.body.password,
      /*  avatar: req.file.filename,  */
    }, {
      where: {
        id: req.session.userLogged.id
      }
    }).then(userUpdated => {
      res.redirect('/users/profile/' + req.userLogged.id)
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
        id: req.session.userLogged.id
      }
    }).then(userUpdated => {

      res.redirect('/users/profile/' + req.params.id)
    })
      .catch(error => console.log(error));
  },

  logout: (req, res) => {
    res.clearCookie('recordame');
    req.session.destroy();
    res.redirect('/')
  }

};

module.exports = usersController;



