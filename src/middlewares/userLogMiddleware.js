module.exports = (req, res, next) => {
    const User = require('../models/User');

    res.locals.isLogged = true;
    
    const emailInCookie = req.cookies.userData;
    const userFromCookie = User.findByFile('email', emailInCookie);

    if(userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = false;
        res.locals.userLogged = req.session.userLogged
    }

    next();
}