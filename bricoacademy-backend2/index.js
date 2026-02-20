// IMPORTACIONES
const express = require("express");
const path = require("path");
const cors = require("cors");
const { logMensaje } = require("./utils/logger.js");

// Rutas de la API
const teachersRoutes = require("./routes/teacherRoutes");
const coursesRoutes = require("./routes/courseRoutes");
const statsRoutes = require("./routes/statsRoutes");

// INICIALIZACIÓN
const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE - PARSEO
app.use(express.json());
app.use((req, res, next) => {
	console.log("METHOD:", req.method, "URL:", req.url);
	next();
});

// MIDDLEWARE - CORS - Cualquier origen

app.use(cors());

// MIDDLEWARE - ARCHIVOS ESTÁTICOS

app.use(express.static(path.join(__dirname, "public")));

// RUTAS - API REST

app.use("/api/teachers", teachersRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/stats", statsRoutes);

// RUTAS - SPA (Catch-all)

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // SERVIDOR

// app.listen(port, () => {
// 	logMensaje(`Servidor escuchando en el puerto ${port}`);
// });

// SERVIDOR (solo arranca si NO estamos en test)
if (process.env.NODE_ENV != "test") {
	app.listen(port, () => {
		logMensaje(`Servidor escuchando en el puerto ${port}`);
	});
}
else {
	console.log("ESTAMOS HACIENDO TEST");
}

// Exportamos la app para poder testearla con supertest
module.exports = app;
