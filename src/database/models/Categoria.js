module.exports = (sequelize, dataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER
    },
    categoria: {
      type: dataTypes.STRING
    },
  },
    {
      tableName: 'categorias',
      timestamps: false
    });
  
  Categoria.associate = (models) => {
    Categoria.hasMany(models.Producto, {
      as: 'productos',
      foreignKey: 'id_categoria'
    });
  }

  return Categoria;
};