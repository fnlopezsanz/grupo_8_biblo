const path = require("path");
const db = require('../database/models');
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const sequelize = db.sequelize;
const { check, body, validationResult } = require('express-validator');

const usersController = {

  userlist: (req, res) => {
    db.Usuarios.findAll({
      include: ['rol']
    })
      .then(function (users) {
        res.render('users/users-list', { users });
      })
      .catch(error => console.log(error));
  },

  find: (req, res) => {
    
    const busqueda = req.body.busq
    db.Usuarios.findAll({
      include: ['rol'],
      where: {
        /* nombre: { [Op.like]: "%" + busqueda + "%" }, */
        /* apellido: { [Op.like]: "%" + busqueda + "%" }, */
        [Op.or]: [
          {
            apellido: {
              [Op.like]: "%" + busqueda + "%"
            }
          },
          {
            nombre: {
              [Op.like]: "%" + busqueda + "%"
            }
          }
        ]
}
    })
      .then(function (users) {
        res.render('users/users-list', { users });
      })
      .catch(error => console.log(error));
  },

  login: (req, res) => {
    res.render("users/login");
  },

  processLogin: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/login", { errors: resultValidation.mapped(), oldData: req.body });
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
        } else if (userInDb.id != undefined && bcrypt.compareSync(req.body.password, userInDb.password)) { 
            //LOGUEO EXITOSO
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

  perfil: (req, res) => {
    db.Usuarios
      .findByPk(req.params.id)
      .then(function (user) {
        if (!user) {
          res.render('users/noperfil')
        } else {
          // console.log(res.locals)
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
    res.render("users/carrito")
  },

  edit: function (req, res) {
    db.Usuarios.findByPk(req.params.id)
      .then(function (user) {
        // console.log(res.locals.userLogged)
        res.render('users/editarUser', { user: user });
      })
      .catch(error => console.log(error));
  },

  update: function (req, res) {
    let idEditado = req.params.id;
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      db.Usuarios.findByPk(req.params.id)
        .then(function (user) {
          console.log(resultValidation)
          return res.render("users/editarUser", { errors: resultValidation.mapped(), oldData: req.body, user });
        })
        .catch(error => console.log(error));
    } else {
      // Busca un usuario que matchee con el email del body
      db.Usuarios
        .findOne({
          where: {
            email: req.body.email
          }
        })
        .then(userInDb => {
          // Si no matchea con ningún mail registrado, se puede actualizar el email
          if (!userInDb) {
            db.Usuarios.findByPk(idEditado)
              .then((encontrado) => {
                db.Usuarios.update({
                  nombre: req.body.nombre,
                  apellido: req.body.apellido,
                  email: req.body.email,
                },
                  {
                    where: { id: idEditado },
                  }
                )
              })
              .then((userUpdated) => {
                // Luego de actualizar la info del usuario, guarda esa nueva data en userLogged y redirige al perfil del usuario.
                db.Usuarios.findByPk(idEditado)
                  .then((editado) => {
                    req.session.userLogged = editado;
                    return res.redirect('/users/perfil/' + idEditado)
                  })
              })
          // Si el email que se quiere introducir ya existe en la base y el id del usuario a editar no es el mismo del usuario con email en la base, se devuelve un error
          } else if (req.body.email == userInDb.email && idEditado != userInDb.id) {
            db.Usuarios.findByPk(req.params.id)
              .then(function (user) {
                let mensajeError = "Este email ya se encuentra registrado"
                return res.render("users/editarUser", { mensajeError, oldData: req.body, user })
              })      
          } else {
            db.Usuarios.findByPk(idEditado)
              .then((encontrado) => {
                db.Usuarios.update({
                  nombre: req.body.nombre,
                  apellido: req.body.apellido,
                  email: req.body.email,
                },
                  {
                    where: { id: idEditado },
                  }
                )
              })
              .then((userUpdated) => {
                db.Usuarios.findByPk(idEditado)
                  .then((editado) => {
                    req.session.userLogged = editado;
                    return res.redirect('/users/perfil/' + idEditado)
                  })
              })
          }
        })    
          .catch(error => console.log(error));        
      }
  },

  editPass: function (req, res) {
    db.Usuarios.findByPk(req.params.id)
      .then(function (user) {
          res.render('users/editarPass', { user: user });
      })
      .catch(error => console.log(error));  
  },

  updatePass: function (req, res) {
    const resultValidation = validationResult(req);
         
    if (resultValidation.errors.length > 0) {
      db.Usuarios.findByPk(req.params.id)
        .then(function (user) {
          return res.render("users/editarPass", { errors: resultValidation.mapped(), user });
        })
        .catch(error => console.log(error));
    } else {
    db.Usuarios.update(
        {
          password: bcrypt.hashSync(req.body.newPass, 10),
        },
        {
          where: { id: req.params.id },
        })
        .then(() => {
          res.redirect("/users/perfil/" + req.params.id);
        })
        .catch((error) => res.send(error));
    }
  },

  editarAvatar: function (req, res) {
    db.Usuarios.findByPk(req.params.id)
      .then(function (user) {
        res.render('users/editarAvatar', { user: user });
      })
  },

  updateAvatar: function (req, res) {
    let idEditado = req.params.id;
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      db.Usuarios.findByPk(req.params.id)
        .then(function (user) {
          return res.render("users/editarAvatar", { errors: resultValidation.mapped(), user });
        })
        .catch(error => console.log(error));
    } else {
      db.Usuarios.findByPk(idEditado)
      .then(function (userFound) {
        let user = userFound;
        db.Usuarios.update({
          avatar: req.file?.filename
          },
          {
            where: {
              id: idEditado
          }
          })
        .then(userUpdated => {
          db.Usuarios.findByPk(idEditado)
            .then((editado) => {
              req.session.userLogged = editado;
              res.redirect('/users/perfil/' + idEditado)
            })
            .catch((error) => res.send(error));
        })
        .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
    }
  },

  logout: (req, res) => {
    res.clearCookie('recordame');
    req.session.destroy();
    res.redirect('/')
  }

};

module.exports = usersController;



