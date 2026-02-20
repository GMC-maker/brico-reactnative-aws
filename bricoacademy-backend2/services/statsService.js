// services/statsService.js
// Servicio de estadísticas (Sequelize) - cursos por profesor

const initModels = require("../models/init-models.js").initModels;
const sequelize = require("../config/sequelize.js");
const models = initModels(sequelize);

const Teacher = models.teacher;
const Course = models.course;

const { fn, col } = require("sequelize");

class StatsService {
	async getCoursesPerTeacher() {
		const rows = await Teacher.findAll({
			attributes: [
				"id_teacher",
				"fullname",
				[fn("COUNT", col("courses.id_course")), "totalCursos"],
			],
			include: [
				{
					model: Course,
					as: "courses", // el alias en init-models.js
					attributes: [],
					required: false, // LEFT JOIN -> incluye profes sin cursos (cuenta 0)
				},
			],
			group: ["teacher.id_teacher", "teacher.fullname"],
			raw: true,
		});

		return rows.map((r) => ({
			profesor: r.fullname,
			totalCursos: Number(r.totalCursos),
		}));
	}
}

module.exports = new StatsService();
