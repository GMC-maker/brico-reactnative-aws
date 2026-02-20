// services/teacherService.js
// Servicio para interactuar con el modelo Sequelize `Profesores`

// Recupera la función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crea la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Carga las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recupera el modelo teacher
const Teacher = models.teacher;

class TeacherService {
	async getAllTeachers(filters = {}) {
		const where = {};

		//si esta activo
		if (filters.active !== undefined) {
			where.active =
				filters.active === "1" ||
				filters.active === 1 ||
				filters.active === true ||
				filters.active === "true";
		}
		// status=ALTA/PERMISO/BAJA
		if (filters.status) {
			where.status = String(filters.status).toUpperCase().trim();
		}

		// Devuelve todos los profesores.
		const result = await Teacher.findAll({ where });
		return result;
	}

	// Devuelve un teacher por su id
	async getTeacherById(id_teacher) {
		const result = await Teacher.findByPk(id_teacher);
		return result;
	}

	//Crea un teacher
	async createTeacher(teacher) {
		//si un profesor es nuevo, se da de alta y esta activo(automaticamente)
		teacher.status = "ALTA";
		teacher.active = 1;

		const result = await Teacher.create(teacher);
		return result;
	}

	//Borrar un teacher
	async deleteTeacher(id_teacher) {
		const numFilas = await Teacher.destroy({
			where: { id_teacher: id_teacher },
		});
		return numFilas;
	}

	//Actualizar un teacher
	async updateTeacher(teacher) {
		//si un profesor es puesto de baja su estado cambia a inactive...
		if (teacher.status === "BAJA") {
			teacher.active = 0;
		}
		let numFilas = await Teacher.update(teacher, {
			where: { id_teacher: teacher.id_teacher },
		});

		// Si numFilas es 0 y existe, es que no hay cambios en los datos.

		if (numFilas == 0 && (await Teacher.findByPk(teacher.id_teacher))) {
			numFilas = 1; // Devuelvo uno para indicar que todo ha ido bien
		}

		return numFilas;
	}

	// Si un profe se pone de baja, el estado cambia a INACTIVE.
}

module.exports = new TeacherService();
