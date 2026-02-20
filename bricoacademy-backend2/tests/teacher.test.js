const request = require("supertest");
const app = require("../index");

describe(" API Teachers (6 tests mínimos)", () => {
	let createdId;

	// Datos válidos (según tu modelo/controller)
	const teacherBase = {
		fullname: "Profe Jest Test",
		dni: "89999999Z",
		email: `jest_${Date.now()}@bricoacademy.com`,
		status: "ALTA", // aunque tu service lo fuerza a ALTA
		active: 1, // aunque tu service lo fuerza a 1
		image_url: "https://via.placeholder.com/64",
	};

	test("1) GET /api/teachers -> 200 y devuelve array", async () => {
		const res = await request(app).get(
			"http://localhost:3000/api/teachers",
		);

		expect(res.statusCode).toBe(200);
		expect(res.body.ok).toBe(true);
		expect(Array.isArray(res.body.datos)).toBe(true);
	});

	test("2) POST /api/teachers -> 201 y devuelve teacher creado con id_teacher", async () => {
		const res = await request(app).post("http://localhost:3000/api/teachers").send(teacherBase);

		expect(res.statusCode).toBe(201);
		expect(res.body.ok).toBe(true);
		expect(res.body.datos).toBeDefined();

		createdId = res.body.datos.id_teacher;
		expect(createdId).toBeTruthy();
	});

	test("3) GET /api/teachers/:id -> 200 y devuelve objeto teacher", async () => {
		const res = await request(app).get(`/api/teachers/${createdId}`);

		expect(res.statusCode).toBe(200);
		expect(res.body.ok).toBe(true);
		expect(res.body.datos).toBeDefined();
		expect(res.body.datos.id_teacher).toBe(Number(createdId)); // Sequelize suele devolver número
	});

	test("4) GET /api/teachers/:id inexistente -> 404 y ok=false", async () => {
		const res = await request(app).get("/api/teachers/99999999");

		expect(res.statusCode).toBe(404);
		expect(res.body.ok).toBe(false);
	});

	test("5) PUT /api/teachers/:id -> 204 (sin body)", async () => {
		const cambios = {
			fullname: "Profe Jest Test EDIT",
			dni: teacherBase.dni,
			email: teacherBase.email,
			status: "PERMISO",
		};

		const res = await request(app)
			.put(`/api/teachers/${createdId}`)
			.send(cambios);

		expect(res.statusCode).toBe(204);
	});

	test("6) DELETE /api/teachers/:id -> 204 (sin body)", async () => {
		const res = await request(app).delete(`/api/teachers/${createdId}`);
		expect(res.statusCode).toBe(204);
	});
});
