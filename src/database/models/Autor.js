module.exports = (sequelize, dataTypes) => {
const Autor = sequelize.define('Autores', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER
    },
    fullname: {
      type: dataTypes.STRING
    }
  },
  {
      tableName: 'autores',
      timestamps: false
  });

  Autor.associate = (models) => {
    Autor.hasMany(models.Productos, {
      as: 'producto',
      foreignKey: 'id_autor'
    });
  }

  return Autor;
};