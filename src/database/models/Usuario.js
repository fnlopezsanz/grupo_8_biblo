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
		id_rol: {
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
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		});

	Usuario.associate = (models) => {
		Usuario.belongsTo(models.Roles, {
			as: 'rol',
			foreignKey: 'id_rol'
		});
	}

	return Usuario;
};