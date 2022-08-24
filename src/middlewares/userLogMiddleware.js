const db = require("../database/models");

module.exports = (req, res, next) => {

    res.locals.isLogged = true;

    const emailInCookie = req.cookies.userData;
    const userFromCookie = db.Usuarios
        .findAll({
            where: {
                email: req.body.email
            }
        })
        .then(function(user){
            return (user[0] == emailInCookie);
        });

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    console.log(userFromCookie)

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = false;
        res.locals.userLogged = req.session.userLogged
    }

    next();
}