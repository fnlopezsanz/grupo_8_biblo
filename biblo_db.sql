CREATE DATABASE biblo_db;
USE biblo_db;
-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-09-2022 a las 04:24:36
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblo_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE `autores` (
  `id` int(10) UNSIGNED NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`id`, `fullname`) VALUES
(1, 'Jessie James'),
(2, 'Peter Stromba'),
(3, 'Michael Peterson'),
(4, 'Robert Miyagi'),
(5, 'Johanna de Arch'),
(6, 'Mijail Jordan'),
(7, 'Rogelio Federer'),
(8, 'Ramona Lagarza'),
(9, 'Lucrecia Mantel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(10) UNSIGNED NOT NULL,
  `categoria` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `categoria`) VALUES
(1, 'BESTSELLERS'),
(2, 'OTROS'),
(3, 'NOVEDADES'),
(4, 'DESTACADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `id` int(10) UNSIGNED NOT NULL,
  `genero` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id`, `genero`) VALUES
(1, 'Biografía'),
(2, 'Novela'),
(3, 'Historia'),
(4, 'Ciencia'),
(5, 'Deportes'),
(6, 'Narrativa'),
(7, 'Infantil'),
(8, 'Teatro'),
(9, 'Arte');
(10, 'Música');
(11, 'Poesía');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_autor` int(10) UNSIGNED NOT NULL,
  `id_genero` int(10) UNSIGNED NOT NULL,
  `id_categoria` int(10) UNSIGNED NOT NULL,
  `titulo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `imagen` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `anio` smallint(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `id_autor`, `id_genero`, `id_categoria`, `titulo`, `descripcion`, `precio`, `imagen`, `anio`, `created_at`, `updated_at`) VALUES
(11, 4, 7, 3, 'Alicia en el País de las Maravillas', 'Alicia está aburrida. De repente, un conejo blanco, vestido con pantalón y saco, que mira desesperado a su reloj, anuncia preocupado que llegará tarde a alguna parte.', '3500.00', 'imagenproduct-1662593644660.jpg', 1865, '2022-08-27 04:55:22', '2022-09-07 23:34:04'),
(15, 3, 2, 1, 'El Código de D Vinci', 'El código Da Vinci es una novela de misterio escrita por Dan Brown y publicada por primera vez por Random House en 2003. Se ha convertido en un superventas mundial, con más de 80 millones de ejemplares vendidos y traducido a 44 idiomas.', '2300.00', 'ecd.jpg', 2003, '2022-08-27 05:00:55', '2022-08-27 05:00:55'),
(19, 8, 2, 4, 'Red Queen', 'La protagonista es Mare, una chica de sangre roja que sobrevive en medio de la pobreza realizando pequeños robos. Cierto día, el azar la lleva a la corte. Allí demuestra tener poderes especiales, los cuales resultan insólitos para alguien del pueblo.', '4200.00', 'rq.jpg', 2015, '2022-08-27 05:04:16', '2022-08-27 05:04:16'),
(20, 1, 1, 1, 'A Novel Of Zelda Fitzgerald', 'When beautiful, reckless Southern belle Zelda Sayre meets F. Scott Fitzgerald at a country club dance in 1918, she is seventeen years old and he is a young army lieutenant stationed in Alabama.', '3500.00', 'imagenproduct-1662599171481.jpg', 2014, '2022-09-08 01:06:11', '2022-09-08 01:06:11'),
(21, 3, 2, 1, 'Rayuela', 'Horacio Oliveira es el protagonista de esta novela que pone en juego la subjetividad del lector y brinda múltiples finales. Comúnmente conocida como antinovela, y señalada por el propio Cortázar como contranovela.\r\nLa novela mantiene un estilo muy variado', '5000.00', 'imagenproduct-1662599295184.jpg', 1963, '2022-09-08 01:08:15', '2022-09-08 01:08:15'),
(22, 4, 6, 3, 'La Naranja Mecánica', 'Gran Bretaña, en un futuro indeterminado. Alex (Malcolm McDowell) es un joven muy agresivo que tiene dos pasiones: la violencia desaforada y Beethoven. Es el jefe de la banda de los drugos, que dan rienda suelta a sus instintos más salvajes apaleando, vio', '4100.00', 'imagenproduct-1662600471084.jpg', 1971, '2022-09-08 01:10:10', '2022-09-08 01:27:51'),
(23, 4, 2, 3, 'El Alquimista', 'El alquimista relata las aventuras de Santiago, un joven pastor andaluz que viaja desde su tierra natal hacia el desierto egipcio en busca de un tesoro oculto en las pirámides. La imaginación y el coraje del protagonista le hacen perseguir su \"Leyenda Per', '2600.00', 'imagenproduct-1662599504088.jpg', 1988, '2022-09-08 01:11:19', '2022-09-08 01:11:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `rol` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(1, 'Cliente'),
(2, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_rol` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'no-image.png',
  `remember_token` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `id_rol`, `nombre`, `apellido`, `email`, `password`, `avatar`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 2, 'Emiliana', 'Baglioni', 'emi@gmail.com', '$2a$10$bddfWHFm0zsv1iqsF2E19e1hFN6PVgEOjA47HZHYqBL9IyTOnpabe', 'user-1661301224772.jpg', '', '2022-08-24 00:33:44', '2022-08-30 05:45:10'),
(6, 2, 'Emiliana A', 'Bagl', 'abril@gmail.com', '$2a$10$SP1fKtZR/NWfSZOHVgzbNefTJBoXEIJ5lYmlyyaYUjF4EJ13RYInK', 'imagenuser-1663288179177.jpg', '', '2022-09-16 00:29:39', '2022-09-16 02:07:48');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_autor` (`id_autor`),
  ADD KEY `id_genero` (`id_genero`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email` (`email`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autores`
--
ALTER TABLE `autores`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `id_autor` FOREIGN KEY (`id_autor`) REFERENCES `autores` (`id`),
  ADD CONSTRAINT `id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `id_genero` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `id_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
