# Documentación Técnica - BricoAcademy Backend API

By: Gabriela María Celano Díaz  2DAM_25_26

---

## 1. Estructura del Proyecto

```
bricoacademy-backend/
├── config/                 # Configuración de la aplicación
├── controllers/            # Controladores (lógica de rutas)
├── models/                 # Modelos Sequelize (estructura de BD)
├── routes/                 # Definición de endpoints
├── services/               # Servicios (lógica de negocio)
├── utils/                  # Utilidades (logger, helpers)
├── public/                 # Archivos estáticos
├── request/                # Ejemplos de requests HTTP
├── sql/                    # Scripts SQL
├── index.js                # Punto de entrada
└── package.json            # Dependencias
```

---

## 2. Función de Cada Carpeta

### **config/**

Contiene la configuración de la aplicación y conexión a base de datos.

- **config.js**: Define variables de entorno (puerto, credenciales BD, clave secreta)
- **sequelize.js**: Establece la conexión a MySQL usando Sequelize
- **sequelize-auto.js**: Herramienta para generar modelos automáticamente desde la BD

### **controllers/**

Controladores que manejan las peticiones HTTP. Validan entrada y coordinan con los servicios.

- **courseController.js**: Gestiona peticiones relacionadas con cursos
- **teacherController.js**: Gestiona peticiones relacionadas con profesores

### **models/**

Definiciones de modelos Sequelize que mapean las tablas de la BD.

- **course.js**: Modelo de la tabla `course`
- **teacher.js**: Modelo de la tabla `teacher`
- **init-models.js**: Inicializa y establece relaciones entre modelos

### **routes/**

Define los endpoints y vincula con los controladores.

- **courseRoutes.js**: Rutas para `/api/courses`
- **teacherRoutes.js**: Rutas para `/api/teachers`

### **services/**

Capa de servicios con la lógica de negocio. Interactúan directamente con Sequelize.

- **courseService.js**: Operaciones CRUD para cursos
- **teacherService.js**: Operaciones CRUD para profesores

### **utils/**

Funciones auxiliares reutilizables.

- **logger.js**: Utilidad para loguear mensajes y errores SQL

### **public/**

Archivos estáticos. Página HTML de bienvenida.

### **request/**

Archivos `.rest` para pruebas de endpoints (REST Client de VS Code).

---

## 3. Modelos de Datos

### **Teacher (Profesor)**

| Campo            | Tipo          | Restricciones                       |
| ---------------- | ------------- | ----------------------------------- |
| `id_teacher`     | INTEGER       | PK, AutoIncrement                   |
| `dni`            | STRING(12)    | Unique, Not Null                    |
| `fullname`       | STRING(60)    | Not Null                            |
| `email`          | STRING(50)    | Unique, Not Null                    |
| `active`         | BOOLEAN       | Default: 1                          |
| `status`         | STRING(20)    | Default: "ALTA" (ALTA/BAJA/PERMISO) |
| `teaching_hours` | INTEGER       | Default: 0                          |
| `hourly_rate`    | DECIMAL(10,2) | Default: 0.00                       |
| `hire_date`      | DATEONLY      | Not Null                            |
| `image_url`      | STRING(255)   | Nullable                            |

**Validaciones especiales:**

- DNI y email deben ser únicos
- Al crear un profesor, automáticamente `status="ALTA"` y `active=1`
- Si se pone `status="BAJA"`, automáticamente `active=0`

---

### **Course (Curso)**

| Campo         | Tipo          | Restricciones                     |
| ------------- | ------------- | --------------------------------- |
| `id_course`   | INTEGER       | PK, AutoIncrement                 |
| `id_teacher`  | INTEGER       | FK → teacher.id_teacher, Nullable |
| `name`        | STRING(120)   | Not Null                          |
| `description` | TEXT          | Nullable                          |
| `online`      | BOOLEAN       | Default: 0                        |
| `start_date`  | DATEONLY      | Not Null                          |
| `duration`    | INTEGER       | Default: 0                        |
| `price`       | DECIMAL(10,2) | Default: 0.00                     |
| `image_url`   | STRING(255)   | Nullable                          |

**Relaciones:**

- Un profesor puede tener muchos cursos (`hasMany`)
- Un curso pertenece a un profesor (`belongsTo`)
- Un curso puede existir sin profesor (FK es nullable)

---

## 4. Controladores

### **CourseController**

#### `getAllCourses(req, res)`

- **Método:** GET `/api/courses`
- **Filtros (query params):**
    - `online=1|0`: Cursos online o presenciales
    - `start_date=YYYY-MM-DD`: Cursos en fecha exacta
    - `start_date_from` + `start_date_to`: Rango de fechas (deben ir juntos)
- **Validación:** Ambos parámetros de rango deben indicarse
- **Respuesta:** Array de cursos o mensaje si no hay resultados
- **Status:** 200 (éxito), 400 (validación), 500 (error)

#### `getCourseById(req, res)`

- **Método:** GET `/api/courses/:id`
- **Parámetro:** `id` (id_course)
- **Respuesta:** Objeto curso o error 404 si no existe
- **Status:** 200 (éxito), 404 (no encontrado), 500 (error)

#### `createCourse(req, res)`

- **Método:** POST `/api/courses`
- **Body:** Objeto con campos del curso
- **Validación:** Realizada por Sequelize (restricciones de BD)
- **Respuesta:** Curso creado con su ID
- **Status:** 201 (creado), 500 (error)

#### `updateCourse(req, res)`

- **Método:** PUT `/api/courses/:id`
- **Parámetro:** `id` (id_course en ruta)
- **Body:** Campos a actualizar
- **Lógica especial:** Si no hay cambios pero existe, devuelve 204
- **Respuesta:** 204 (sin contenido) o error 404/500
- **Status:** 204 (actualizado), 404 (no encontrado), 500 (error)

#### `deleteCourse(req, res)`

- **Método:** DELETE `/api/courses/:id`
- **Parámetro:** `id` (id_course)
- **Respuesta:** 204 (borrado) o error 404/500
- **Status:** 204 (borrado), 404 (no encontrado), 500 (error)

---

### **TeacherController**

Estructura similar a CourseController con métodos:

#### `getAllTeachers(req, res)`

- **Filtros:**
    - `active=1|0`: Profesores activos/inactivos
    - `status=ALTA|BAJA|PERMISO`: Estado del profesor
- **Respuesta:** Array de profesores

#### `getTeacherById(req, res)`

- **Respuesta:** Objeto profesor o 404

#### `createTeacher(req, res)`

- **Auto-asignación:** `status="ALTA"`, `active=1`
- **Respuesta:** Profesor creado (201)

#### `updateTeacher(req, res)`

- **Lógica especial:** Si `status="BAJA"` → `active=0`
- **Respuesta:** 204 (actualizado)

#### `deleteTeacher(req, res)`

- **Respuesta:** 204 (borrado)

---

## 5. Rutas/Endpoints

### **Rutas de Cursos** (`/api/courses`)

| Método | Ruta   | Controlador     | Descripción               |
| ------ | ------ | --------------- | ------------------------- |
| GET    | `/`    | `getAllCourses` | Listar cursos con filtros |
| GET    | `/:id` | `getCourseById` | Obtener curso por ID      |
| POST   | `/`    | `createCourse`  | Crear nuevo curso         |
| PUT    | `/:id` | `updateCourse`  | Actualizar curso          |
| DELETE | `/:id` | `deleteCourse`  | Eliminar curso            |

### **Rutas de Profesores** (`/api/teachers`)

| Método | Ruta   | Controlador      | Descripción                   |
| ------ | ------ | ---------------- | ----------------------------- |
| GET    | `/`    | `getAllTeachers` | Listar profesores con filtros |
| GET    | `/:id` | `getTeacherById` | Obtener profesor por ID       |
| POST   | `/`    | `createTeacher`  | Crear nuevo profesor          |
| PUT    | `/:id` | `updateTeacher`  | Actualizar profesor           |
| DELETE | `/:id` | `deleteTeacher`  | Eliminar profesor             |

---

## 6. Flujo de una Petición HTTP

### Ejemplo: GET `/api/courses?online=1`

```
1. Cliente envía petición HTTP
   ↓
2. Express rutea a courseRoutes.js
   ↓
3. courseRoutes.js → CourseController.getAllCourses(req, res)
   ↓
4. CourseController valida query params (online, start_date, rango)
   ↓
5. CourseController → courseService.getAllCourses(filters)
   ↓
6. CourseService construye objeto 'where' con condiciones Sequelize
   ↓
7. Sequelize ejecuta: SELECT * FROM course WHERE online=1
   ↓
8. BD MySQL devuelve resultados
   ↓
9. CourseService retorna array de cursos
   ↓
10. CourseController formatea respuesta JSON
   ↓
11. Express envía response HTTP 200 + JSON al cliente
```

### Formato de Respuesta Estándar

```json
{
	"ok": true,
	"datos": [
		/* array o objeto */
	],
	"mensaje": "Descripción de la operación"
}
```

En caso de error:

```json
{
	"ok": false,
	"datos": null,
	"mensaje": "Descripción del error"
}
```

---

## 7. Conexión con la Base de Datos

### Archivo: sequelize.js

```javascript
// Crea instancia de Sequelize
const sequelize = new Sequelize(
	config.db.name, // bricoacademy
	config.db.user, // root
	config.db.password, // test
	{
		host: config.db.host, // localhost
		port: config.db.port, // 3306
		dialect: "mysql",
	},
);

// Prueba conexión al iniciar aplicación
await sequelize.authenticate();
```

### Archivo: config.js

Lee variables de entorno:

- `DB_HOST`: localhost (por defecto)
- `DB_USER`: root (por defecto)
- `DB_PASSWORD`: test (por defecto)
- `DB_NAME`: bricoacademy (por defecto)
- `DB_PORT`: 3306 (por defecto)
- `PORT`: 3000 (por defecto)
- `SECRET_KEY`: clave secreta (por defecto)

### Archivo: init-models.js

Define relaciones entre modelos:

```javascript
// Un curso pertenece a un profesor
course.belongsTo(teacher, {
	as: "teacher",
	foreignKey: "id_teacher",
});

// Un profesor tiene muchos cursos
teacher.hasMany(course, {
	as: "courses",
	foreignKey: "id_teacher",
});
```

### Inicialización en Services

```javascript
const initModels = require("../models/init-models.js").initModels;
const sequelize = require("../config/sequelize.js");
const models = initModels(sequelize);
const Course = models.course; // Acceso al modelo
```

---

## 8. Gestión de Errores

### Niveles de Gestión

#### **Nivel 1: Validación en Controlador**

```javascript
if (
	(start_date_from && !start_date_to) ||
	(!start_date_from && start_date_to)
) {
	return res.status(400).json({
		ok: false,
		datos: null,
		mensaje: "Debes indicar start_date_from y start_date_to juntos",
	});
}
```

- Valida parámetros de entrada
- Retorna 400 (Bad Request)

#### **Nivel 2: Operaciones en Service**

```javascript
const result = await Course.findAll({ where });
return result; // Delega manejo de errores al controlador
```

- Ejecuta operaciones Sequelize
- Levanta excepciones si hay error

#### **Nivel 3: Try-Catch en Controlador**

```javascript
try {
  const courses = await courseService.getAllCourses(req.query);
  return res.status(200).json({ ok: true, datos: courses, ... });
} catch (err) {
  logMensaje("Error en getAllCourses:", err);
  return res.status(500).json({
    ok: false,
    datos: null,
    mensaje: "Error al recuperar cursos"
  });
}
```

- Captura excepciones
- Loguea el error real
- Retorna respuesta genérica al cliente

#### **Nivel 4: Validación de Existencia**

```javascript
const course = await courseService.getCourseById(id_course);
if (course) {
  return res.status(200).json({ ok: true, datos: course, ... });
} else {
  return res.status(404).json({
    ok: false,
    datos: null,
    mensaje: "Curso no encontrado"
  });
}
```

- Verifica si recurso existe
- Retorna 404 (Not Found)

#### **Nivel 5: Validación de Cambios en Update**

```javascript
let numFilas = await Course.update(course, {
	where: { id_course: course.id_course },
});

if (numFilas == 0 && (await Course.findByPk(course.id_course))) {
	numFilas = 1; // Recurso existe pero no hay cambios
}

if (numFilas == 0) {
	return res.status(404).json({
		ok: false,
		datos: null,
		mensaje: "No encontrado: " + course.id_course,
	});
}
```

- Distingue: recurso no existe vs. sin cambios
- Retorna 404 solo si no existe

### Códigos HTTP Utilizados

| Código | Significado  | Uso                                      |
| ------ | ------------ | ---------------------------------------- |
| 200    | OK           | GET/POST exitoso                         |
| 201    | Created      | Recurso creado                           |
| 204    | No Content   | Actualización/borrado exitoso (sin body) |
| 400    | Bad Request  | Validación fallida (parámetros)          |
| 404    | Not Found    | Recurso no existe                        |
| 500    | Server Error | Error interno del servidor               |

### Utilidad de Logging: logger.js

```javascript
logMensaje(arg1, arg2, ...);  // Log con timestamp
logErrorSQL(err);              // Log estructurado de errores MySQL
```

Se llama en controladores para registrar errores:

```javascript
logMensaje("Error en getAllCourses:", err);
```

---

## Resumen Técnico

**Arquitectura:** MVC (Model-View-Controller) + Servicios

**Stack:**

- Runtime: Node.js
- Framework: Express
- ORM: Sequelize
- BD: MySQL

**Flujo de datos:**

```
HTTP Request → Routes → Controller → Service → Sequelize → MySQL
                ↑                                           ↓
                ← ← ← ← ← ← ← ← ← ← ← ← JSON Response ← ←
```

**Características:**

- Validación de entrada en controladores
- Lógica de negocio en servicios
- Gestión de errores con try-catch
- Relaciones entre entidades (Teacher-Course)
- Filtrado y búsqueda con Sequelize
- Respuestas JSON estandarizadas
