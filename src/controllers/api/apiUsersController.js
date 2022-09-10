const db = require('../../database/models');
const sequelize = db.sequelize;

const apiUsersController = {
  'list': (req, res) => {
    db.Usuarios.findAll()
      .then(users => {
        return res.json({
          count: users.length,
          users: users.map(user => {
            data = {
              id: user.id,
              nombre: user.nombre,
              apellido: user.apellido,
              detail: req.protocol + '://' + req.get('host') + req.originalUrl  + user.id
            }
            return data
          })
          })
        })
        .catch(error => console.log(error))
    },

  'detail': (req, res) => {
    db.Usuarios.findByPk(req.params.id, {
      attributes: { exclude: ['password', 'id_rol'] }
    })
    .then(user => {
      let url =  { urlAvatar: req.protocol + '://' + req.get('host') + req.originalUrl  + user.avatar } 
      return res.json({
      })
    })
    .catch(error => console.log(error))
    }
}


module.exports = apiUsersController;
