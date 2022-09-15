const db = require('../../database/models');
const sequelize = db.sequelize;

const apiUsersController = {
  'list': (req, res) => {
    db.Usuarios.findAll({
      attributes: ['id', 'nombre', 'apellido']
    })
      .then(users => {
        users.forEach(user => {
          user.dataValues.detail = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + user.id
        })
        return res.json({
          count: users.length,
          users: users
        })
      })
      .catch(error => console.log(error))
  },

  'detail': (req, res) => {
    db.Usuarios.findByPk(req.params.id, {
      attributes: { exclude: ['password', 'id_rol'] }
    })
      .then(userDetail => {
        userDetail.dataValues.urlAvatar = req.protocol + '://' + req.get('host') + req.originalUrl + userDetail.avatar
        return res.json({ userDetail })
      })
      .catch(error => console.log(error))
  }
}


module.exports = apiUsersController;
