const db = require('../../database/models');
const sequelize = db.sequelize;

const apiProductsController = {
  'list': async (req, res) => {
    const countByCategory = {}
    let productos = await db.Productos.findAll({
      include: ['categoria'],
      attributes: ['id', 'titulo', 'descripcion']
    })
    .then(productos => {
      productos.forEach(product => {
        let categoria = product.categoria.categoria;
        countByCategory[categoria] = productos.filter(prod => {
          return categoria == prod.categoria.categoria;
        }).length;
      })

      productos.forEach(product => {
      product.dataValues.detail = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + product.id
      })
      return productos
    })
    .catch(error => console.log(error))

    return res.json({
      count: productos.length,
      countByCategory,
      productos: productos
    })
  },

  'detail': (req, res) => {
    db.Productos.findByPk(req.params.id, {
      include: ['autor', 'categoria', 'genero'],
      attributes: { exclude: ['id_autor', 'id_genero', 'id_categoria'] }
    })
      .then(productDetail => {
        productDetail.dataValues.urlImagen = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + productDetail.imagen
        return res.json({ productDetail })
      })
      .catch(error => console.log(error))
  }
}

module.exports = apiProductsController;