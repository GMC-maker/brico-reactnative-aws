-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 31-01-2026 a las 22:21:14
-- Versión del servidor: 8.0.43
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bricoacademy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `course`
--

CREATE TABLE `course` (
  `id_course` int NOT NULL,
  `id_teacher` int DEFAULT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `online` tinyint(1) NOT NULL DEFAULT '0',
  `start_date` date NOT NULL,
  `duration` int NOT NULL DEFAULT '0',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `course`
--

INSERT INTO `course` (`id_course`, `id_teacher`, `name`, `description`, `online`, `start_date`, `duration`, `price`, `image_url`) VALUES
(1, 1, 'Macramé básico', 'Nudos esenciales y creación de colgantes.', 0, '2026-02-01', 80, 45.00, 'https://picsum.photos/seed/course1/400/250'),
(2, 1, 'Restauración de muebles', 'Lijado, imprimación y acabado.', 0, '2026-02-15', 40, 60.00, 'https://picsum.photos/seed/course2/400/250'),
(3, 2, 'Cerámica creativa', 'Técnicas básicas con arcilla y esmaltes.', 1, '2026-03-05', 25, 50.00, 'https://picsum.photos/seed/course3/400/250'),
(4, 2, 'Costura para principiantes', 'Uso de máquina y patrones simples.', 0, '2026-03-20', 35, 55.00, 'https://picsum.photos/seed/course4/400/250'),
(5, 3, 'Bricolaje en casa', 'Herramientas básicas y seguridad.', 1, '2026-01-10', 20, 35.00, 'https://picsum.photos/seed/course5/400/250'),
(6, 3, 'Introducción al bricolaje', 'Bricolaje para mayores, principantes.', 1, '2026-05-01', 10, 15.00, NULL),
(7, 1, 'Velas artesanales', 'Mezclas, fragancias y moldes.', 1, '2026-04-01', 15, 25.00, 'https://picsum.photos/seed/course6/400/250'),
(8, NULL, 'Curso Fontanería Básica', 'Introducción a fontanería', 0, '2026-03-01', 150, 150.00, NULL),
(11, NULL, 'Curso Fontanería Básica', 'Introducción a fontanería', 0, '2026-03-01', 30, 150.00, 'null'),
(13, 3, 'Prueba de Curso Nuevo', 'Aqui vamos a ser muy creativos', 0, '2026-01-08', 100, 50.00, 'https://picsum.photos/seed/course1/400/250');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teacher`
--

CREATE TABLE `teacher` (
  `id_teacher` int NOT NULL,
  `dni` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ALTA',
  `teaching_hours` int NOT NULL DEFAULT '0',
  `hourly_rate` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hire_date` date NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `teacher`
--

INSERT INTO `teacher` (`id_teacher`, `dni`, `fullname`, `email`, `active`, `status`, `teaching_hours`, `hourly_rate`, `hire_date`, `image_url`) VALUES
(1, '55566688A', 'Ana Romero', 'ana@bricoacademy.com', 1, 'ALTA', 8, 20.00, '2025-09-01', 'https://picsum.photos/seed/teacher1/300/300'),
(2, '23456789B', 'Carlos Vega', 'carlos@bricoacademy.com', 1, 'PERMISO', 8, 18.50, '2025-10-15', 'https://picsum.photos/seed/teacher2/300/300'),
(3, '34567890C', 'Lucía Marín', 'lucia@bricoacademy.com', 0, 'BAJA', 36, 22.00, '2024-02-10', 'https://picsum.photos/seed/teacher3/300/300'),
(4, '88888888Y', 'Profesor Actualizado', 'powershell@correo.com', 1, 'ALTA', 12, 22.00, '2026-02-06', 'https://picsum.photos/seed/ps/300/300'),
(7, '77777777X', 'POST AISLADO', 'aislado@correo.com', 0, 'BAJA', 5, 30.00, '2026-02-03', 'https://picsum.photos/seed/postteacher/300/300'),
(10, '11223344X', 'Ana Moreno Ruiz', 'ana.ruiz@email.com', 1, 'ALTA', 10, 8.00, '2026-01-02', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id_course`),
  ADD KEY `fk_course_teacher` (`id_teacher`);

--
-- Indices de la tabla `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id_teacher`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `course`
--
ALTER TABLE `course`
  MODIFY `id_course` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id_teacher` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `fk_course_teacher` FOREIGN KEY (`id_teacher`) REFERENCES `teacher` (`id_teacher`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
