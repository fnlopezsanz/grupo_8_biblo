module.exports = (sequelize, dataTypes) => {
	const Usuario = sequelize.define('Usuarios', {
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
    imagen: {
			type: dataTypes.STRING
		}
  }, 
  {
		tableName: 'usuarios',
		timestamps: false
	});

  Usuario.associate = (models) => {
    Usuario.belongsTo(models.TipoUsuarios, {
      as: 'tipoUsuario',
      foreignKey: 'id_tipo'
    });

  Usuario.hasMany(models.Productos, {
      as: 'productos',
      foreignKey: 'id_creador'
    })
  }
	
	return Usuario;
};