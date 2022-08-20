module.exports = (sequelize, dataTypes) => {
  const Categoria = sequelize.define('Categorias', {
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
    Categoria.hasMany(models.Productos, {
      as: 'producto',
      foreignKey: 'id_categoria'
    });
  }

  return Categoria;
};