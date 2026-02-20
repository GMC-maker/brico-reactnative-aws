// controllers/courseController.js
const { logMensaje } = require("../utils/logger.js");
const courseService = require("../services/courseService.js");

class CourseController {
	async getAllCourses(req, res) {
		const { start_date, start_date_from, start_date_to } = req.query;

		//Caso no permitido: solo una de las dos
		if (
			(start_date_from && !start_date_to) ||
			(!start_date_from && start_date_to)
		) {
			return res.status(400).json({
				ok: false,
				datos: null,
				mensaje:
					"Debes indicar start_date_from y start_date_to juntos para un rango",
			});
		}
		try {
			const courses = await courseService.getAllCourses(req.query);
			return res.status(200).json({
				ok: true,
				datos: courses,
				mensaje:
					courses.length === 0
						? "No hay cursos para los filtros indicados"
						: "Cursos recuperados correctamente",
			});
		} catch (err) {
			logMensaje("Error en getAllCourses:", err);
			return res.status(500).json({
				ok: false,
				datos: null,
				mensaje: "Error al recuperar cursos",
			});
		}
	}

	async createCourse(req, res) {
		const course = req.body;

		try {
			const courseNew = await courseService.createCourse(course);

			return res.status(201).json({
				ok: true,
				datos: courseNew,
				mensaje: "Curso registrado correctamente",
			});
		} catch (err) {
			logMensaje("Error en createCourse:", err);
			return res.status(500).json({
				ok: false,
				datos: null,
				mensaje: "Error al registrar un curso",
			});
		}
	}

	async deleteCourse(req, res) {
		const id_course = req.params.id;

		try {
			const numFilas = await courseService.deleteCourse(id_course);
			if (numFilas == 0) {
				return res.status(404).json({
					ok: false,
					datos: null,
					mensaje: "Curso no encontrado: " + id_course,
				});
			} else {
				// Borrado correcto
				return res.status(204).send();
			}
		} catch (err) {
			logMensaje("Error en deleteCourse:", err);
			return res.status(500).json({
				ok: false,
				datos: null,
				mensaje: "Error al borrar un curso",
			});
		}
	}

	async updateCourse(req, res) {
		// Recupero el id_course de la ruta
		const id_course = req.params.id;
		// El objeto del course llega en el body
		const course = req.body;

		course.id_course = id_course;
		//log para ver errores id:
		console.log("PARAM id:", req.params.id);
		console.log("BODY:", req.body);

		try {
			const numFilas = await courseService.updateCourse(course);

			if (numFilas == 0) {
				// No se ha encontrado lo que se quería actualizar o no hay nada que cambiar
				return res.status(404).json({
					ok: false,
					datos: null,
					mensaje: "No encontrado: " + course.id_course,
				});
			} else {
				// Al dar status 204 no se devuelva nada
				res.status(204).send();
			}
		} catch (err) {
			logMensaje("Error en EditCourse:", err);
			return res.status(500).json({
				ok: false,
				datos: null,
				mensaje: "Error al editar un registro de curso",
			});
		}
	}

	async getCourseById(req, res) {
		const id_course = req.params.id;

		try {
			const course = await courseService.getCourseById(id_course);
			// course != null -- se ha encontrado el curso
			if (course) {
				return res.status(200).json({
					ok: true,
					datos: course,
					mensaje: "Curso recuperado correctamente",
				});
			} else {
				return res.status(404).json({
					ok: false,
					datos: null,
					mensaje: "Curso no encontrado",
				});
			}
		} catch (err) {
			logMensaje("Error en getCourseById:", err);
			return res.status(500).json({
				ok: false,
				datos: null,
				mensaje: "Error al recuperar un curso",
			});
		}
	}

	//agregamos luego otras busquedas por fecha de inicio o si es online.
}

module.exports = new CourseController();
