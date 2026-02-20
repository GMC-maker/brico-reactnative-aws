// controllers/statsController.js
const { logMensaje } = require("../utils/logger.js");
const statsService = require("../services/statsService");

class StatsController {
	async getCoursesPerTeacher(req, res) {
		try {
			const rows = await statsService.getCoursesPerTeacher();

			return res.status(200).json({
				ok: true,
				datos: rows,
				mensaje:
					"Estadística cursos por profesor recuperada correctamente",
			});
		} catch (err) {
			logMensaje("Error en getCoursesPerTeacher:", err);
			return res.status(500).json({
				ok: false,
				datos: null,
				mensaje: "Error al recuperar estadística cursos por profesor",
			});
		}
	}
}

module.exports = new StatsController();
