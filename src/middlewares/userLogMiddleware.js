const db = require("../database/models");
const sequelize = db.sequelize;

module.exports = (req, res, next) => {

    res.locals.isLogged = false;

    const emailInCookie = req.cookies.userEmail;
    const userFromCookie = db.Usuarios
        .findOne({
            where: {
              email: emailInCookie
            }
        })
        .then(function(user) {
            return user;
        });

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    console.log(userFromCookie)

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }

    next();
}