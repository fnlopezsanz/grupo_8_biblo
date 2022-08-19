const fs = require("fs");
const path = require("path");
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
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

    if (resultValidation.isEmpty()) {
      let userToLog = User.findByFile('email', req.body.email);

      if (userToLog) {
        let passOk = bcrypt.compareSync(req.body.password, userToLog.password)
        if (passOk) {
          delete userToLog.password;
          req.session.userLogged = userToLog;

          if(req.body.recordame){
            res.cookie('userData', req.body.email, { maxAge: (1000 * 60)})
          }

          return res.redirect('/')
        }
        return res.render('users/login', { errors: { msg: 'Usuario y/o contraseña incorrecto' } });
      }
    } else {
      return res.render('users/login', { errors: resultValidation.mapped(), oldData: req.body })
    }

  },

  register: (req, res) => {
    res.render("users/register");
  },

  store: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render('users/register', {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }

    let userInDB = User.findByFile('email', req.body.email);

    if (userInDB) {
      return res.render('users/register', {
        errors: {
          email: {
            msg: '¡Usuario ya registrado!'
          }
        },
        oldData: req.body
      });
    }

    const userToCreate = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.file?.filename || 'image-default.jpg'
    }

    // const userCreated = User.create(userToCreate);
    const userCreated = db.Usuario.create(userToCreate);

    return res.redirect('/users/login')

  },

  carrito: (req, res) => {
    res.render("users/carrito")
  },

  perfil: (req, res) => {
    db.Usuario
      .findByPk(req.params.id)
      .then(function (user) {
        if (!user) {
          res.render('noperfil')
        } else {
          res.render('perfil', { user: user })
        }
      })
      .catch(error => console.log(error));
  },

  edit: function (req, res) {
    db.Usuario.findByPk(req.params.id)

      .then(function (user) {

        res.render('editarUser', { user: user });
      })
  },

  update: function (req, res) {
    console.log("req.body.imagen");
    db.Usuario.update({
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
    db.Usuario.findByPk(req.params.id)
      .then(function (user) {
        res.render('editarAvatar', { user: user });
      })
  },

  updateAvatar: function (req, res) {
    db.Usuario.update({
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



