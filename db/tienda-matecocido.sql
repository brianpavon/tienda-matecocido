-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-02-2024 a las 18:10:05
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda-matecocido`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categ` int(11) NOT NULL,
  `codigo` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categ`, `codigo`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'tazas', 'Tazas', '2023-01-24 18:05:16', '2023-01-24 18:05:16'),
(7, 'combo', 'Combos', '2023-01-24 19:08:17', '2023-01-24 19:08:17'),
(8, 'hogar-deco', 'Hogar & Deco', '2023-01-24 19:08:53', '2023-01-24 19:08:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colores`
--

CREATE TABLE `colores` (
  `id_color` int(11) NOT NULL,
  `codigo` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `path_img` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `colores`
--

INSERT INTO `colores` (`id_color`, `codigo`, `nombre`, `path_img`, `created_at`, `updated_at`) VALUES
(1, 'jaspeado', 'Jaspeado', '/../../images/colors.png', '2023-01-24 20:05:46', '2023-01-24 20:05:46'),
(4, 'matecocidoUno', 'Matecocido', '/../../images/colors.png', '2023-01-24 20:07:38', '2023-01-24 20:07:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id_curso` int(11) NOT NULL,
  `codigo` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `cupos` int(3) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos_personales`
--

CREATE TABLE `datos_personales` (
  `id_datos_personales` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` int(15) NOT NULL,
  `calle` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `altura` int(8) NOT NULL,
  `cod_postal` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_pagina`
--

CREATE TABLE `info_pagina` (
  `id_info` int(11) NOT NULL,
  `sobre_mi` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `ubicacion` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `whatsapp` int(15) DEFAULT NULL,
  `instagram` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `facebook` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `extras` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `extras_2` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas_frecuentes`
--

CREATE TABLE `preguntas_frecuentes` (
  `id_preg_frec` int(11) NOT NULL,
  `pregunta` text COLLATE utf8_spanish_ci NOT NULL,
  `respuesta` text COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_prod` int(11) NOT NULL,
  `codigo` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_prod`, `codigo`, `nombre`, `descripcion`, `precio`, `stock`, `created_at`, `updated_at`) VALUES
(10, 'taza-pepe', 'Taza Peperina', 'Taza de 250 cc, 4 asas de colores', 2300, 5, '2023-02-24 16:36:32', '2023-08-15 16:45:56'),
(19, 'taza-matecocido', 'Taza Matecocido', 'Tazas de 250cc', 1600, 2, '2023-03-13 23:16:53', '2023-04-27 23:53:06'),
(38, 'taza-jengibre', 'Taza Jengibre', 'Taza de 300 cc, 2 colores disponibles', 1800, 5, '2023-03-13 23:41:10', '2023-03-23 17:17:04'),
(44, 'florero-peque', 'Florero Pequeño', 'Florero chico, ideal para ambientar los espacios interiores.', 1200, 3, '2023-03-13 23:59:43', '2023-03-13 23:59:43'),
(67, 'taza-cafe-plato', 'Taza Cafecitas con Plato', 'Tazas para café con plato, se pueden elegir el color de las asas. Se venden en pares.', 1500, 4, '2023-03-14 00:43:17', '2023-03-14 00:43:17'),
(68, 'tazon-malva', 'Tazones Malva', 'Son re grandes, ideales para sopas o mucho mate cocido.', 2200, 2, '2023-03-23 18:27:48', '2023-03-23 18:28:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_categorias`
--

CREATE TABLE `productos_categorias` (
  `id_prod_categ` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `id_categ` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos_categorias`
--

INSERT INTO `productos_categorias` (`id_prod_categ`, `id_prod`, `id_categ`, `created_at`, `updated_at`) VALUES
(7, 10, 1, '2023-02-24 16:36:32', '2023-02-24 16:36:32'),
(11, 19, 1, '2023-03-13 23:16:53', '2023-03-13 23:16:53'),
(14, 44, 8, '2023-03-13 23:59:44', '2023-03-13 23:59:44'),
(15, 67, 1, '2023-03-14 00:43:17', '2023-03-14 00:43:17'),
(16, 67, 7, '2023-03-14 00:43:17', '2023-03-14 00:43:17'),
(19, 38, 1, '2023-03-23 17:17:04', '2023-03-23 17:17:04'),
(20, 68, 1, '2023-03-23 18:27:48', '2023-03-23 18:27:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_colores`
--

CREATE TABLE `productos_colores` (
  `id_prod_color` int(11) NOT NULL,
  `id_color` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos_colores`
--

INSERT INTO `productos_colores` (`id_prod_color`, `id_color`, `id_prod`, `created_at`, `updated_at`) VALUES
(3, 1, 10, '2023-02-24 16:36:32', '2023-02-24 16:36:32'),
(6, 1, 19, '2023-03-13 23:16:53', '2023-03-13 23:16:53'),
(7, 4, 19, '2023-03-13 23:16:53', '2023-03-13 23:16:53'),
(11, 1, 44, '2023-03-13 23:59:44', '2023-03-13 23:59:44'),
(12, 1, 67, '2023-03-14 00:43:17', '2023-03-14 00:43:17'),
(14, 1, 38, '2023-03-23 17:17:04', '2023-03-23 17:17:04'),
(15, 1, 68, '2023-03-23 18:27:48', '2023-03-23 18:27:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_imagenes`
--

CREATE TABLE `productos_imagenes` (
  `id_img_prod` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `path_img` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos_imagenes`
--

INSERT INTO `productos_imagenes` (`id_img_prod`, `id_prod`, `path_img`, `nombre`, `created_at`, `updated_at`) VALUES
(11, 10, 'imgs-productos/taza-pepe/taza_peperina.jpg', 'taza_peperina.jpg', '2023-02-24 16:36:32', '2023-02-24 16:36:32'),
(14, 19, 'imgs-productos/taza-matecocido/tazas_matecocido.jpg', 'tazas_matecocido.jpg', '2023-03-13 23:16:53', '2023-03-13 23:16:53'),
(17, 44, 'imgs-productos/florero-peque/florero_chico.jpg', 'florero_chico.jpg', '2023-03-13 23:59:44', '2023-03-13 23:59:44'),
(18, 67, 'imgs-productos/taza-cafe-plato/tazas_cafecitas.jpg', 'tazas_cafecitas.jpg', '2023-03-14 00:43:17', '2023-03-14 00:43:17'),
(25, 38, 'imgs-productos/taza-jengibre/taza_jengibre.jpg', 'taza_jengibre.jpg', '2023-03-23 16:57:56', '2023-03-23 16:57:56'),
(26, 38, 'imgs-productos/taza-jengibre/taza_jengibre_frente.jpg', 'taza_jengibre_frente.jpg', '2023-03-23 16:57:56', '2023-03-23 16:57:56'),
(27, 19, 'imgs-productos/taza-matecocido/taza_matecocido_matecocido.jpg', 'taza_matecocido_matecocido.jpg', '2023-03-23 18:23:12', '2023-03-23 18:23:12'),
(28, 19, 'imgs-productos/taza-matecocido/taza_matecocido_jaspeada.jpg', 'taza_matecocido_jaspeada.jpg', '2023-03-23 18:23:12', '2023-03-23 18:23:12'),
(29, 68, 'imgs-productos/tazon-malva/taza-malva.jpg', 'taza-malva.jpg', '2023-03-23 18:27:48', '2023-03-23 18:27:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(20) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre`) VALUES
(1, 'ADMIN'),
(2, 'CLIENTE'),
(3, 'EDITOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `clave` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `id_rol` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `email`, `clave`, `id_rol`, `created_at`, `updated_at`) VALUES
(1, 'daian_2130@hotmail.com', 'c132531e98dedeb0f39eae48791e2152c6ed1299c1f20b638a2f770932c3c4872dc94bc8c215faadff699dc331d835797ad9a45f0a59e60cefae3ec0a3f6d53e', 1, '2023-01-24 15:28:19', '2023-01-24 15:28:19'),
(2, 'brian.pavon@hotmail.com', 'c132531e98dedeb0f39eae48791e2152c6ed1299c1f20b638a2f770932c3c4872dc94bc8c215faadff699dc331d835797ad9a45f0a59e60cefae3ec0a3f6d53e', 1, '2023-01-24 15:28:37', '2023-01-24 15:28:37'),
(4, 'brian@mail.com', 'c132531e98dedeb0f39eae48791e2152c6ed1299c1f20b638a2f770932c3c4872dc94bc8c215faadff699dc331d835797ad9a45f0a59e60cefae3ec0a3f6d53e', 2, '2023-04-03 19:43:52', '2023-04-03 19:43:52');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categ`),
  ADD UNIQUE KEY `codigo_unico` (`codigo`);

--
-- Indices de la tabla `colores`
--
ALTER TABLE `colores`
  ADD PRIMARY KEY (`id_color`),
  ADD UNIQUE KEY `codigo_color_unico` (`codigo`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id_curso`);

--
-- Indices de la tabla `datos_personales`
--
ALTER TABLE `datos_personales`
  ADD PRIMARY KEY (`id_datos_personales`),
  ADD KEY `dato_usuario` (`id_usuario`);

--
-- Indices de la tabla `info_pagina`
--
ALTER TABLE `info_pagina`
  ADD PRIMARY KEY (`id_info`);

--
-- Indices de la tabla `preguntas_frecuentes`
--
ALTER TABLE `preguntas_frecuentes`
  ADD PRIMARY KEY (`id_preg_frec`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_prod`),
  ADD UNIQUE KEY `codigo_unico` (`codigo`);

--
-- Indices de la tabla `productos_categorias`
--
ALTER TABLE `productos_categorias`
  ADD PRIMARY KEY (`id_prod_categ`);

--
-- Indices de la tabla `productos_colores`
--
ALTER TABLE `productos_colores`
  ADD PRIMARY KEY (`id_prod_color`);

--
-- Indices de la tabla `productos_imagenes`
--
ALTER TABLE `productos_imagenes`
  ADD PRIMARY KEY (`id_img_prod`),
  ADD KEY `imagen_producto` (`id_prod`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `colores`
--
ALTER TABLE `colores`
  MODIFY `id_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `datos_personales`
--
ALTER TABLE `datos_personales`
  MODIFY `id_datos_personales` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info_pagina`
--
ALTER TABLE `info_pagina`
  MODIFY `id_info` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `productos_categorias`
--
ALTER TABLE `productos_categorias`
  MODIFY `id_prod_categ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `productos_colores`
--
ALTER TABLE `productos_colores`
  MODIFY `id_prod_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `productos_imagenes`
--
ALTER TABLE `productos_imagenes`
  MODIFY `id_img_prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `datos_personales`
--
ALTER TABLE `datos_personales`
  ADD CONSTRAINT `dato_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
