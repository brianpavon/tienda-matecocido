-- ============================================================
-- migration-v2.sql — Tienda Matecocido
-- Actualiza schema existente para Laravel 12 + Sanctum
-- Ejecutar sobre la DB tienda-matecocido existente
-- ============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

-- ============================================================
-- 1. UNIQUE en usuarios.email (prevenir duplicados)
-- ============================================================
ALTER TABLE `usuarios`
  ADD UNIQUE KEY `email_unico` (`email`);

-- ============================================================
-- 2. Columna 'activo' para soft-delete en tablas principales
-- ============================================================
ALTER TABLE `productos`
  ADD COLUMN `activo` TINYINT(1) NOT NULL DEFAULT 1 AFTER `stock`;

ALTER TABLE `categorias`
  ADD COLUMN `activo` TINYINT(1) NOT NULL DEFAULT 1 AFTER `nombre`;

ALTER TABLE `colores`
  ADD COLUMN `activo` TINYINT(1) NOT NULL DEFAULT 1 AFTER `path_img`;

ALTER TABLE `usuarios`
  ADD COLUMN `activo` TINYINT(1) NOT NULL DEFAULT 1 AFTER `id_rol`;

-- ============================================================
-- 3. Precio de INT a DECIMAL(10,2)
-- ============================================================
ALTER TABLE `productos`
  MODIFY `precio` DECIMAL(10,2) NOT NULL;

-- ============================================================
-- 4. Foreign keys en tablas pivot (no tenian)
-- ============================================================
ALTER TABLE `productos_categorias`
  ADD CONSTRAINT `fk_prodcateg_producto` FOREIGN KEY (`id_prod`) REFERENCES `productos` (`id_prod`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_prodcateg_categoria` FOREIGN KEY (`id_categ`) REFERENCES `categorias` (`id_categ`) ON DELETE CASCADE;

ALTER TABLE `productos_colores`
  ADD CONSTRAINT `fk_prodcolor_producto` FOREIGN KEY (`id_prod`) REFERENCES `productos` (`id_prod`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_prodcolor_color` FOREIGN KEY (`id_color`) REFERENCES `colores` (`id_color`) ON DELETE CASCADE;

-- ============================================================
-- 5. FK usuarios.id_rol -> roles.id_rol
-- ============================================================
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);

-- ============================================================
-- 6. FK productos_imagenes.id_prod (ya tiene indice, falta FK)
-- ============================================================
ALTER TABLE `productos_imagenes`
  ADD CONSTRAINT `fk_prodimg_producto` FOREIGN KEY (`id_prod`) REFERENCES `productos` (`id_prod`) ON DELETE CASCADE;

-- ============================================================
-- 7. Tabla ordenes (nueva)
-- ============================================================
CREATE TABLE `ordenes` (
  `id_orden` INT(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(11) NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `estado` ENUM('PENDIENTE','CONFIRMADA','ENVIADA','ENTREGADA','CANCELADA') NOT NULL DEFAULT 'PENDIENTE',
  `nombre_envio` VARCHAR(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `direccion_envio` VARCHAR(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telefono_envio` VARCHAR(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `email_envio` VARCHAR(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `notas` TEXT COLLATE utf8_spanish_ci DEFAULT NULL,
  `activo` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_orden`),
  KEY `fk_orden_usuario` (`id_usuario`),
  CONSTRAINT `fk_orden_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- ============================================================
-- 8. Tabla detalle_ordenes (nueva)
-- ============================================================
CREATE TABLE `detalle_ordenes` (
  `id_detalle` INT(11) NOT NULL AUTO_INCREMENT,
  `id_orden` INT(11) NOT NULL,
  `id_prod` INT(11) NOT NULL,
  `cantidad` INT(11) NOT NULL,
  `precio_unitario` DECIMAL(10,2) NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_detalle`),
  KEY `fk_detalle_orden` (`id_orden`),
  KEY `fk_detalle_producto` (`id_prod`),
  CONSTRAINT `fk_detalle_orden` FOREIGN KEY (`id_orden`) REFERENCES `ordenes` (`id_orden`) ON DELETE CASCADE,
  CONSTRAINT `fk_detalle_producto` FOREIGN KEY (`id_prod`) REFERENCES `productos` (`id_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- ============================================================
-- 9. Tabla personal_access_tokens (Sanctum)
-- ============================================================
CREATE TABLE `personal_access_tokens` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` VARCHAR(255) NOT NULL,
  `tokenable_id` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `token` VARCHAR(64) NOT NULL,
  `abilities` TEXT DEFAULT NULL,
  `last_used_at` TIMESTAMP NULL DEFAULT NULL,
  `expires_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`, `tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- ============================================================
-- 10. Rehash passwords (de SHA-512 a bcrypt)
-- NOTA: Los passwords actuales son SHA-512 sin salt.
-- La password original de todos los usuarios seed es: 123456
-- Este UPDATE los reemplaza por el bcrypt hash de "123456"
-- (bcrypt cost 12, generado con password_hash('123456', PASSWORD_BCRYPT))
-- ============================================================
UPDATE `usuarios` SET `clave` = '$2y$12$ykGbnF1QReU/3E8ZPMoFF.9U0HrqpYRbfBGsKM/XPZTZ.NQpao6WS' WHERE `id_usuario` IN (1, 2, 4);

COMMIT;

-- ============================================================
-- RESUMEN DE CAMBIOS:
-- 1. UNIQUE en usuarios.email
-- 2. Columna activo en: productos, categorias, colores, usuarios
-- 3. productos.precio: INT -> DECIMAL(10,2)
-- 4. FKs en productos_categorias y productos_colores
-- 5. FK usuarios.id_rol -> roles.id_rol
-- 6. FK productos_imagenes.id_prod -> productos.id_prod
-- 7. Nueva tabla: ordenes
-- 8. Nueva tabla: detalle_ordenes
-- 9. Nueva tabla: personal_access_tokens (Sanctum)
-- 10. Rehash passwords a bcrypt (password: 123456)
-- ============================================================
