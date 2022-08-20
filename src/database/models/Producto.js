module.exports = (sequelize, dataTypes) => {
  const Producto = sequelize.define('producto', {
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
    anio: {
      type: dataTypes.INTEGER
    },
    id_creador: {
      type: dataTypes.INTEGER
    }
  },
    {
      tablename: 'productos',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });

  Producto.associate = (models) => {
    Producto.belongsTo(models.autor, {
      as: 'autor',
      foreignKey: 'id_autor'
    });
    Producto.belongsTo(models.genero, {
      as: 'genero',
      foreignKey: 'id_genero'
    });
    Producto.belongsTo(models.categoria, {
      as: 'categoria',
      foreignKey: 'id_categoria'
    });
  }

  return Producto;
}