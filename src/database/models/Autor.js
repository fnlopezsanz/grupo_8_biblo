module.exports = (sequelize, dataTypes) => {
const Autor = sequelize.define('Autor', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER
    },
    nombre: {
      type: dataTypes.STRING
    },
    apellido: {
      type: dataTypes.STRING
    },
  },
  {
      tableName: 'autores',
      timestamps: false
  });

  Autor.associate = (models) => {
    Autor.hasMany(models.Producto, {
      as: 'productos',
      foreignKey: 'id_autor'
    });
  }

  return Autor;
};