const db = require('../../database/models');
const sequelize = db.sequelize;

const apiProductsController = {
  'list': (req, res) => {
    db.Productos
      .findAll()
      .then(productos => {
        return res.status(200).json({
          count: productos.length,
          // resolver cómo buscar por categoría
          countByCategory: 'cantidad de productos por categoría',
          productos: productos,
          info_productos: productos.forEach(item => {
            datos = {
              id: item.id,
              name: item.titulo,
              description: item.descripcion,
              detail: 'URL detalle'
            }
            return datos;
          }),
          status: 200
        })
      })
  },

  'detail': (req, res) => {

  },
}

module.exports = apiProductsController;