// services/courseService.js
// Servicio para interactuar con el modelo Sequelize `Cursos`
const { Op } = require("sequelize"); // arriba del archivo
// Recupera la función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crea la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Carga las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recupera el modelo course
const Course = models.course;

class CourseService {
	async getAllCourses(filters = {}) {
		const where = {};
		//si esta online = 1 sino = 0
		if (filters.online !== undefined) {
			where.online =
				filters.online === "1" ||
				filters.online === 1 ||
				filters.online === true ||
				filters.online === "true";
		}

		// Fechas: exacta o rango
		if (filters.start_date) {
			where.start_date = filters.start_date;
		} else if (filters.start_date_from && filters.start_date_to) {
			where.start_date = {
				[Op.between]: [filters.start_date_from, filters.start_date_to],
			};
		}

		// Devuelve todos los cursos.
		const result = await Course.findAll({ where });
		return result;
	}

	// Devuelve un course por su id
	async getCourseById(id_course) {
		const result = await Course.findByPk(id_course);
		return result;
	}

	//Crea un curso
	async createCourse(course) {
		const result = await Course.create(course);
		return result;
	}
	//Borrar un course
	async deleteCourse(id_course) {
		const numFilas = await Course.destroy({
			where: { id_course: id_course },
		});
		return numFilas;
	}

	//Actualizar un course
	async updateCourse(course) {
		let numFilas = await Course.update(course, {
			where: { id_course: course.id_course },
		});

		// Si numFilas es 0 y existe, es que no hay cambios en los datos.

		if (numFilas == 0 && (await Course.findByPk(course.id_course))) {
			numFilas = 1; // Devuelvo uno para indicar que todo ha ido bien
		}
		return numFilas;
	}
}

module.exports = new CourseService();
