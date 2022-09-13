function editUserMiddleware(req, res, next) {

  if (res.locals.userLogged == undefined || res.locals.userLogged.id != req.params.id) {
    return res.redirect("http://localhost:4000/users/login")
  }

  next();
}
module.exports = editUserMiddleware;