const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"course",
		{
			id_course: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			id_teacher: {
				type: DataTypes.INTEGER,
				allowNull: true, // SQL: porque se puede quitar un profe del curso y quedarse el curso sin profe.
				references: {
					model: "teacher",
					key: "id_teacher",
				},
				// onDelete/onUpdate no se pone:
				// Eso ya lo impone MySQL por la constraint del ALTER TABLE.
			},
			name: {
				type: DataTypes.STRING(120),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			online: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: 0,
			},
			start_date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			duration: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: "0.00",
			},
			image_url: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "course",
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id_course" }],
				},
				{
					name: "fk_course_teacher",
					using: "BTREE",
					fields: [{ name: "id_teacher" }],
				},
			],
		},
	);
};
