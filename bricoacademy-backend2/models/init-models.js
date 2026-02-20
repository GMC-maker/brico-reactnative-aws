var DataTypes = require("sequelize").DataTypes;
var _teacher = require("./teacher");
var _course = require("./course");

function initModels(sequelize) {
	var teacher = _teacher(sequelize, DataTypes);
	var course = _course(sequelize, DataTypes);

	course.belongsTo(teacher, {
		as: "teacher",
		foreignKey: "id_teacher",
	});
	teacher.hasMany(course, { as: "courses", foreignKey: "id_teacher" });

	return {
		teacher,
		course,
	};
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
