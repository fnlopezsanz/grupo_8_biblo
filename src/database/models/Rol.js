module.exports = (sequelize, dataTypes) => {
  const Rol = sequelize.define('Rol', {
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
    Rol.hasMany(models.Usuario, {
      as: 'usuarios',
      foreignKey: 'id_rol'
    });
  }

  return Rol;
};