const db = require('../../database/models');
const sequelize = db.sequelize;

const apiProductsController = {
  'list': (req, res) => {
    db.Productos.findAll()
      .then(productos => {
        let destacado = productos.filter(prod => {
          if (prod.id_categoria == 4) {
            return prod
          }
        });
        let bestsellers = productos.filter(prod => {
          if (prod.id_categoria == 2) {
            return prod
          }
        });
        let nuevosLanzamientos = productos.filter(prod => {
          if (prod.id_categoria == 3) {
            return prod
          }
        });
        let otros = productos.filter(prod => {
          if (prod.id_categoria == 1) {
            return prod
          }
        });
        return res.json({
          count: productos.length,
          countByCategory: {
            destacado: destacado.length,
            nuevosLanzamientos: nuevosLanzamientos.length,
            bestsellers: bestsellers.length,
            otros: otros.length
          },
          productos: productos.map(item => {
            datos = {
              id: item.id,
              name: item.titulo,
              description: item.descripcion,
              relaciones: 'no sé',
              detail: req.protocol + '://' + req.get('host') + req.originalUrl + item.id
            }
            return datos;
          })
        })
      })
      .catch(error => console.log(error))

  },

  'detail': (req, res) => {
    db.Productos.findByPk(req.params.id)
      .then(productDetail => {
        productDetail.dataValues.relaciones = 'no sé',
        productDetail.dataValues.urlImagen = req.protocol + '://' + req.get('host') + req.originalUrl  + productDetail.imagen
        return res.json({productDetail})
  })
      .catch(error => console.log(error))
}
  }

module.exports = apiProductsController;