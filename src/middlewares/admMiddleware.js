module.exports = (req, res, next) => {
    if(!res.locals.userLogged){
        return res.redirect('/')
    }
    if(res.locals.userLogged.id_rol != 2){
        return res.redirect('/')
    }
    next();
}