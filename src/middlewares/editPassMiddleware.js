function editPassMiddleware(req, res, next) {

  if (res.locals.userLogged == undefined) {
    return res.redirect("http://localhost:3000/users/login")
  }

  else if (res.locals.userLogged.id != req.params.id) {
    return res.redirect("https://c.tenor.com/O5eQ19XUpSoAAAAC/psychedelic-trippy.gif")
  }
  next();
}
module.exports = editPassMiddleware;