module.exports = (sequelize, dataTypes) => {
	const Usuario = sequelize.define('Usuario', {
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
		email: {
			type: dataTypes.STRING
		},
    id_tipo: {
      type: dataTypes.INTEGER
    },
		password: {
			type: dataTypes.TEXT('tiny')
    },
    avatar: {
			type: dataTypes.STRING
		}
  }, 
  {
		tableName: 'usuarios',
		timestamps: false
	});

  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Rol, {
      as: 'rol',
      foreignKey: 'id_rol'
    });
  }
	
	return Usuario;
};