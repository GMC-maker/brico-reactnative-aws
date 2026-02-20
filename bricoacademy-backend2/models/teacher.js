const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"teacher",
		{
			id_teacher: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			dni: {
				type: DataTypes.STRING(12),
				allowNull: false,
				unique: "dni",
			},
			fullname: {
				type: DataTypes.STRING(60),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: "email",
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: 1, // MySQL tinyint(1)
			},
			status: {
				type: DataTypes.STRING(20),
				allowNull: false,
				defaultValue: "ALTA",
			},
			teaching_hours: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			hourly_rate: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: "0.00",
			},
			hire_date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			image_url: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "teacher",
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id_teacher" }],
				},
				{
					name: "dni",
					unique: true,
					using: "BTREE",
					fields: [{ name: "dni" }],
				},
				{
					name: "email",
					unique: true,
					using: "BTREE",
					fields: [{ name: "email" }],
				},
			],
		},
	);
};
