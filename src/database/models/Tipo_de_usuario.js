module.exports = (sequelize, dataTypes) => {
  const Tipo = sequelize.define('TipoUsuarios', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER
    },
    tipo_de_usuario: {
      type: dataTypes.STRING
    },
  },
    {
      tableName: 'categorias',
      timestamps: false
    });

  Tipo.associate = (models) => {
    Tipo.hasMany(models.Usuarios, {
      as: 'tipoUsuario',
      foreignKey: 'id_tipo'
    });
  }

  return Categoria;
};