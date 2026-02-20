// controllers/teacherController.js
const { logMensaje } = require("../utils/logger.js");
const teacherService = require("../services/teacherService");

class TeacherController {
	async getAllTeachers(req, res) {
		try {
			const teachers = await teacherService.getAllTeachers(req.query);
			return res.status(200).json({
				ok: true,
				datos: teachers,
				mensaje: "Profesores recuperados correctamente",
			});
		} catch (err) {
			logMensaje("Error en getAllTeacher:", err);
			return res.status(500).json({
				ok: false,
				datos: null,
				mensaje: "Error al recuperar profesores",
			});
		}
	}

	async createTeacher(req, res) {
		const teacher = req.body;

		try {
			const teacherNew = await teacherService.createTeacher(teacher);

			return res.status(201).json({
				ok: true,
				datos: teacherNew,
				mensaje: "Profesor registrado correctamente",
			});
		} catch (err) {
			logMensaje("Error en createTeacher:", err);

			return res.status(400).json({
				ok: false,
				datos: null,
				mensaje:
					err?.original?.sqlMessage ||
					err?.parent?.sqlMessage ||
					"Error al registrar un profesor",
			});
		}
	}

	async deleteTeacher(req, res) {
		const id_teacher = req.params.id;

		try {
			const numFilas = await teacherService.deleteTeacher(id_teacher);
			if (numFilas == 0) {
				return res.status(404).json({
					ok: false,
					datos: null,
					mensaje: "Profesor no encontrado: " + id_teacher,
				});
			} else {
				// Borrado correcto
				return res.status(204).send();
			}
		} catch (err) {
			logMensaje("Error en deleteTeacher:", err);
			return res.status(500).json({
				ok: false,
				datos: null,
				mensaje: "Error al borrar un teacher",
			});
		}
	}

	async updateTeacher(req, res) {
		// Recupero el id_teacher de la ruta
		const id_teacher = req.params.id;
		// El objeto del teacher llega en el body
		const teacher = req.body;

		teacher.id_teacher = id_teacher;

		try {
			const numFilas = await teacherService.updateTeacher(teacher);

			if (numFilas == 0) {
				// No se ha encontrado lo que se quería actualizar o no hay nada que cambiar
				return res.status(404).json({
					ok: false,
					datos: null,
					mensaje: "No encontrado: " + teacher.id_teacher,
				});
			} else {
				// Al dar status 204 no se devuelva nada
				res.status(204).send();
			}
		} catch (err) {
			logMensaje("Error en EditTeacher:", err);
			return res.status(500).json({
				ok: false,
				datos: null,
				mensaje: "Error al editar un registro de profesor",
			});
		}
	}

	async getTeacherById(req, res) {
		const id_teacher = req.params.id;

		try {
			const teacher = await teacherService.getTeacherById(id_teacher);
			// teacher != null -- se ha encontrado el directos
			if (teacher) {
				return res.status(200).json({
					ok: true,
					datos: teacher,
					mensaje: "Profesor(a) recuperado correctamente",
				});
			} else {
				return res.status(404).json({
					ok: false,
					datos: null,
					mensaje: "Profesor(a) no encontrado",
				});
			}
		} catch (err) {
			logMensaje("Error en getTeacherById:", err);
			return res.status(500).json({
				ok: false,
				datos: null,
				mensaje: "Error al recuperar un profesor(a)",
			});
		}
	}

	//agregamos luego otras busquedas por fecha de inicio o si es online.
}

module.exports = new TeacherController();
