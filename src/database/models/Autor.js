module.exports = (sequelize, dataTypes) => {
const Autor = sequelize.define('autor', {
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
    Autor.hasMany(models.producto, {
      as: 'producto',
      foreignKey: 'id_autor'
    });
  }

  return Autor;
};