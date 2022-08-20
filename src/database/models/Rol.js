module.exports = (sequelize, dataTypes) => {
  const Rol = sequelize.define('Roles', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER
    },
    rol: {
      type: dataTypes.STRING
    },
  },
    {
      tableName: 'roles',
      timestamps: false
    });

  Rol.associate = (models) => {
    Rol.hasMany(models.Usuarios, {
      as: 'usuario',
      foreignKey: 'id_rol'
    });
  }

  return Rol;
};