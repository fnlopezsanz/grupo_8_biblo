module.exports = (sequelize, dataTypes) => {
  const Genero = sequelize.define('Generos', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER
    },
    genero: {
      type: dataTypes.STRING
    },
    },
    {
      tableName: 'generos',
      timestamps: false
    });

    Genero.associate = (models) => {
    Genero.hasMany(models.Productos, {
      as: 'producto',
      foreignKey: 'id_genero'
    });
    }

  return Genero;
};