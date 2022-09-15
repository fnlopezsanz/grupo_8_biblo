const db = require('../../database/models');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

const apiProductsController = {
  'list': async (req, res) => {
    let countByCategory = await sequelize.query(`SELECT categorias.categoria, COUNT(*) AS total from productos
    INNER JOIN categorias on categorias.id = productos.id_categoria
    GROUP BY categorias.categoria`, { type: QueryTypes.SELECT });

    
    let productos = await db.Productos.findAll({
      include: {
        
      }
    })

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