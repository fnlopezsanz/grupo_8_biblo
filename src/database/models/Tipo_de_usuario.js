module.exports = (sequelize, dataTypes) => {
  const Tipo = sequelize.define('TipoUsuarios', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER
    },
    tipo: {
      type: dataTypes.STRING
    },
  },
    {
      tableName: 'tipo_de_usuarios',
      timestamps: false
    });

  Tipo.associate = (models) => {
    Tipo.hasMany(models.Usuarios, {
      as: 'usuarios',
      foreignKey: 'id_tipo'
    });
  }

  return Tipo;
};