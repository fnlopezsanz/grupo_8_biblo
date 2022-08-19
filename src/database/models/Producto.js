module.exports = (sequelize, dataTypes) => {
  const Producto = sequelize.define('Producto', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER
    },
    titulo: {
      type: dataTypes.STRING
    },
    id_autor: {
      type: dataTypes.INTEGER
    },
    id_genero: {
      type: dataTypes.INTEGER
    },
    id_categoria: {
      type: dataTypes.INTEGER
    },
    descripcion: {
      type: dataTypes.STRING
    },
    precio: {
      type: dataTypes.DECIMAL(8, 2)
    },
    imagen: {
      type: dataTypes.STRING
    },
    year: {
      type: dataTypes.INTEGER
    },
    id_creador: {
      type: dataTypes.INTEGER
    }
  },
    {
      tablename: 'productos',
      timestamps: false
    });

  Producto.associate = (models) => {
    Producto.belongsTo(models.Autor, {
      as: 'autor',
      foreignKey: 'id_autor'
    });
    Producto.belongsTo(models.Genero, {
      as: 'genero',
      foreignKey: 'id_genero'
    });
    Producto.belongsTo(models.Categoria, {
      as: 'categoria',
      foreignKey: 'id_categoria'
    });
  }

  return Producto;
}