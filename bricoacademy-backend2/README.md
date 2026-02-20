# 🛠️ BricoAcademy – Backend API

Backend del proyecto **BricoAcademy**, una aplicación web para la gestión de profesores y cursos, desarrollada como **API REST** con **Node.js, Express y Sequelize**, conectada a una base de datos **MySQL**.

---

## 🔗 Repositorio en GitHub

https://github.com/GMC-maker/bricoacademy_project.git

---

## ⚙️ Requisitos previos

- Node.js
- npm
- MySQL en local (phpMyAdmin recomendado)
- Visual Studio Code
- Extensión **REST Client** (Huachao Mao) para VS Code

---

## Instalación y configuración

### 1. Acceder a la carpeta backend

cd bricoacademy-backend

## Instalación y configuración

- npm install (dependencia)

## Dependencias utilizadas

- **express**: servidor HTTP
- **cors**: gestión de peticiones desde frontend
- **sequelize**: ORM para MySQL
- **mysql2**: conexión con MySQL
- **dotenv**: gestión de variables de entorno
- **nodemon (dev)**: reinicio automático del servidor en desarrollo
- **sequelize-auto**: generación inicial de modelos a partir de la base de datos

## 📦 Instalación de dependencias

Las dependencias del proyecto pueden instalarse individualmente utilizando los siguientes comandos:

```bash
npm install express
npm install cors
npm install sequelize
npm install mysql2
npm install dotenv
npm install --save-dev nodemon
npm install sequelize-auto

or

npm install (dependency) --legacy-peer-deps
```

## 🧩 Configuración del archivo `.env`

Crear un archivo **`.env`** en la raíz del backend con la siguiente estructura:

```bash
env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bricoacademy
DB_USER=tuUser
DB_PASSWORD=tuPass
```

### Backend

El backend se ejecutará en: http://localhost:3000

### Pruebas de la API

-REST Client en VS Code

###Base de Datos
El proyecto incluye un fichero SQL con:

-La estructura de la base de datos

-Un conjunto de datos iniciales

---

## Infraestructura - Docker LAMP

El proyecto utiliza **Docker Compose** para orquestar un entorno LAMP (Linux, Apache, MySQL, PHP). Esto permite tener MySQL 8.0, phpMyAdmin y Apache preconfigurados sin instalar dependencias localmente.

## Instrucciones de Uso

### Paso 1: Levantar los servicios Docker

Desde la carpeta `docker-lamp/`, ejecuta:

```bash
docker-compose up -d
```

Esto inicia tres contenedores: MySQL (puerto 3306), Apache (puerto 80) y phpMyAdmin (puerto 8081). El archivo `.env` contiene las credenciales:

```env
MYSQL_DATABASE=dbname
MYSQL_USER=dbuser
MYSQL_PASSWORD=test
MYSQL_ROOT_PASSWORD=test
MYSQL_PORT=3306
PHPMYADMIN_PORT=8081
```

### Paso 2: Importar la base de datos

Accede a **phpMyAdmin** en http://localhost:8081 (usuario: `root` / contraseña: `test`). Importa el archivo `sql/bricoacademy.sql` para crear las tablas y datos iniciales.

### Paso 3: Ejecutar la API Node.js

En la carpeta `bricoacademy-backend/`, ejecuta:

```bash
npm install
npm start
```

La API conectará automáticamente a MySQL usando las credenciales de `config/config.js` (host: `localhost`, puerto: `3306`). Ahora puedes probar los endpoints desde http://localhost:3000/api/courses o usando los archivos `.rest` en la carpeta `request/`.

**Para detener todo:** `docker-compose stop` (en `docker-lamp/`)
