module.exports = (sequelize, dataTypes) => {
  const Producto = sequelize.define('Productos', {
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
    }
  },
    {
      tablename: 'productos',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });

  Producto.associate = (models) => {
    Producto.belongsTo(models.Autores, {
      as: 'autor',
      foreignKey: 'id_autor'
    });
    Producto.belongsTo(models.Generos, {
      as: 'genero',
      foreignKey: 'id_genero'
    });
    Producto.belongsTo(models.Categorias, {
      as: 'categoria',
      foreignKey: 'id_categoria'
    });
  }

  return Producto;
}