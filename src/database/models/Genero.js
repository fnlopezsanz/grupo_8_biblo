module.exports = (sequelize, dataTypes) => {
  const Genero = sequelize.define('genero', {
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
    Genero.hasMany(models.producto, {
      as: 'productos',
      foreignKey: 'id_genero'
    });
    }

  return Genero;
};