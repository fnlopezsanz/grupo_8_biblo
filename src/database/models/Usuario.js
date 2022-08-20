module.exports = (sequelize, dataTypes) => {
	const Usuario = sequelize.define('usuario', {
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
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		});

	Usuario.associate = (models) => {
		Usuario.belongsTo(models.rol, {
			as: 'rol',
			foreignKey: 'id_rol'
		});
	}

	return Usuario;
};