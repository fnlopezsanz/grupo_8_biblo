const db = require("../database/models");
const sequelize = db.sequelize;

// module.exports = (req, res, next) => {
async function userLogMiddleware(req, res, next) {
  res.locals.isLogged = false;
  let usuarioLogueado = {}
  let loggedUser_id = req.cookies.recordame

  if (loggedUser_id) {
    await db.Usuarios.findByPk(req.cookies.recordame)
      .then((encontrado) => {
        usuarioLogueado = encontrado.dataValues;
        //console.log(usuarioLogueado);
      })
      .catch((error) => res.send(error));
    console.log(usuarioLogueado);
    req.session.userLogged = usuarioLogueado
  }

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true
    res.locals.userLogged = req.session.userLogged
  }
  // console.log(res.locals.isLogged);
  next()
}
module.exports = userLogMiddleware;