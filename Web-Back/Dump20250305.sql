-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: buenavidaparcialfinal
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `idCarrito` int NOT NULL AUTO_INCREMENT,
  `estadoCarrito` tinyint(1) NOT NULL DEFAULT '1',
  `usuario_id` int DEFAULT NULL,
  `totalCarrito` decimal(10,2) NOT NULL,
  `horaCarrito` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idCarrito`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (1,1,2,0.00,'2025-02-23 22:08:15'),(2,1,3,0.00,'2025-02-23 22:08:15'),(3,1,1,102.43,'2025-02-23 22:16:35');
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito_productos`
--

DROP TABLE IF EXISTS `carrito_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito_productos` (
  `idCarrito` int NOT NULL,
  `idProducto` int NOT NULL,
  `cantidad` int NOT NULL,
  `horaCarrito_producto` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idCarrito`,`idProducto`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `carrito_productos_ibfk_1` FOREIGN KEY (`idCarrito`) REFERENCES `carrito` (`idCarrito`) ON DELETE CASCADE,
  CONSTRAINT `carrito_productos_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_productos`
--

LOCK TABLES `carrito_productos` WRITE;
/*!40000 ALTER TABLE `carrito_productos` DISABLE KEYS */;
INSERT INTO `carrito_productos` VALUES (1,1,2,'2025-02-23 22:08:15'),(2,3,1,'2025-02-23 22:08:15'),(3,1,7,'2025-02-23 22:16:35'),(3,3,3,'2025-02-26 13:15:38');
/*!40000 ALTER TABLE `carrito_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idCategoria` int NOT NULL AUTO_INCREMENT,
  `nombreCategoria` varchar(255) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Aceites Esenciales','Aceites naturales con diversas propiedades'),(2,'Cuidado Facial','Productos para el cuidado del contorno de ojos y piel'),(3,'Higiene Bucal','Productos para la higiene y cuidado bucal'),(4,'Cuidado Corporal','Productos para la piel y el cuerpo');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `descuentos`
--

DROP TABLE IF EXISTS `descuentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `descuentos` (
  `idDescuento` int NOT NULL AUTO_INCREMENT,
  `nombreDescuento` varchar(255) NOT NULL,
  `estadoDescuento` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idDescuento`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `descuentos`
--

LOCK TABLES `descuentos` WRITE;
/*!40000 ALTER TABLE `descuentos` DISABLE KEYS */;
INSERT INTO `descuentos` VALUES (1,'Sin Descuento',1),(2,'Oferta Especial',1);
/*!40000 ALTER TABLE `descuentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `idFavoritos` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `producto_id` int DEFAULT NULL,
  PRIMARY KEY (`idFavoritos`),
  KEY `usuario_id` (`usuario_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE,
  CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
INSERT INTO `favoritos` VALUES (1,2,2),(2,3,7),(3,2,4);
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `idPago` int NOT NULL AUTO_INCREMENT,
  `totalPago` decimal(10,2) NOT NULL,
  `carrito_id` int DEFAULT NULL,
  `estadoPago` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idPago`),
  KEY `carrito_id` (`carrito_id`),
  CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`carrito_id`) REFERENCES `carrito` (`idCarrito`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
INSERT INTO `pago` VALUES (1,15.98,1,1),(2,12.45,2,1);
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos` (
  `idPermiso` int NOT NULL AUTO_INCREMENT,
  `nombrePermiso` varchar(100) NOT NULL,
  `tipo` varchar(10) DEFAULT NULL,
  `estadoPermiso` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idPermiso`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (1,'Gestionar Usuarios','Admin',1),(2,'Gestionar Productos','Admin',1),(3,'Ver Productos','Usuario',1),(4,'Agregar al Carrito','Usuario',1),(5,'Realizar Pagos','Usuario',1),(6,'Gestionar Usuarios','Admin',1),(7,'Gestionar Productos','Admin',1),(8,'Ver Productos','Usuario',1),(9,'Agregar al Carrito','Usuario',1),(10,'Realizar Pagos','Usuario',1);
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombreProducto` varchar(255) NOT NULL,
  `descripcionProducto` text,
  `tallaProducto` varchar(50) DEFAULT NULL,
  `precioProducto` decimal(10,2) NOT NULL,
  `estadoProducto` tinyint(1) NOT NULL DEFAULT '1',
  `imgProducto` text,
  `stockProducto` int NOT NULL,
  `marcaProducto` varchar(255) DEFAULT NULL,
  `categoria_id` int DEFAULT NULL,
  `descuento_id` int DEFAULT NULL,
  PRIMARY KEY (`idProducto`),
  KEY `categoria_id` (`categoria_id`),
  KEY `descuento_id` (`descuento_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`idCategoria`) ON DELETE SET NULL,
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`descuento_id`) REFERENCES `descuentos` (`idDescuento`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Aceite esencial de Clavo','Aceite con propiedades antimicrobianas, antifúngicas y estimulantes.','12ML',7.99,1,'https://drive.google.com/file/d/1yvBN2jcQF9ysudd6cWSG6WSvwFiO64u0/view?usp=sharing',100,'Natura',1,1),(2,'Parches de Oro de 24 kt Rejuvenecedores para Contorno de Ojos','Parches para ojos con efecto rejuvenecedor con oro de 24kt.','60UDS.',15.50,1,NULL,50,'Natura Siberica',2,1),(3,'Parches Iluminadores para el Contorno de Ojos','Parches iluminadores que hidratan y protegen la piel.','60UDS.',15.50,1,NULL,50,'Natura Siberica',2,1),(4,'Parches Supertonificantes para Contorno de Ojos','Parches tonificantes para reducir fatiga e iluminar la piel.','60UDS.',15.50,1,NULL,50,'Natura Siberica',2,1),(5,'6 Discos Desmaquillantes de Fibra Natural','Discos reutilizables de algodón y carbón de bambú.','6UDS.',10.50,1,NULL,70,'Eco Beauty',2,1),(6,'Aceite anticelulítico de abedul','Aceite que mejora la circulación y previene la celulitis.','100ML',22.90,1,NULL,40,'Weleda',4,1),(7,'Aceite antiinflamatorio S.O.S Rescate','Aceite multiuso para quemaduras, golpes y cicatrices.','30ML',12.45,1,NULL,60,'Eco Rescue',1,1),(8,'Aceite Bucal de Coco Orgánico Premium','Aceite bucal con menta y eucalipto para higiene oral.','180ML',9.60,1,NULL,80,'Dr. Goerg',3,1),(9,'Aceite corporal blanco siberiano anticelulítico','Aceite con extractos naturales para mejorar la piel.','200ML',6.95,1,NULL,50,'Natura Siberica',4,1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `nombreRol` varchar(20) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `estadoRol` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador','Usuario con acceso total al sistema',1),(2,'Usuario','Cliente que puede comprar productos',1),(3,'Administrador','Usuario con acceso total al sistema',1),(4,'Usuario','Cliente que puede comprar productos',1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_permisos`
--

DROP TABLE IF EXISTS `roles_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_permisos` (
  `idRoles_Permisos` int NOT NULL AUTO_INCREMENT,
  `idPermisos` int NOT NULL,
  `idRol` int NOT NULL,
  PRIMARY KEY (`idRoles_Permisos`),
  KEY `PK_idRoles_Permisos` (`idPermisos`),
  KEY `FK_IdPermisos` (`idRol`),
  CONSTRAINT `FK_IdPermisos` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`),
  CONSTRAINT `PK_idRoles_Permisos` FOREIGN KEY (`idPermisos`) REFERENCES `permisos` (`idPermiso`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_permisos`
--

LOCK TABLES `roles_permisos` WRITE;
/*!40000 ALTER TABLE `roles_permisos` DISABLE KEYS */;
INSERT INTO `roles_permisos` VALUES (1,1,1),(2,2,1),(3,3,2),(4,4,2),(5,5,2),(6,1,1),(7,2,1),(8,3,2),(9,4,2),(10,5,2);
/*!40000 ALTER TABLE `roles_permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(255) NOT NULL,
  `apellidoUsuario` varchar(255) NOT NULL,
  `correoUsuario` varchar(255) NOT NULL,
  `contrasenaUsuario` text NOT NULL,
  `estadoUsuario` tinyint(1) NOT NULL DEFAULT '1',
  `rol_id` int DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `correoUsuario` (`correoUsuario`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`idRol`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','Principal','admin@buenavida.com','admin123',1,1),(2,'Juan','Pérez','juan.perez@email.com','juan123',1,2),(3,'María','Gómez','maria.gomez@email.com','maria123',1,2),(5,'sssss','Vegssa','fernando.vega@ssssemail.com','$2b$10$fqS9J9ymQmdN1TC4Vi.rsO0gFoGm2/YcUwJux8RwBeNcHDrswqT6q',1,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'buenavidaparcialfinal'
--
/*!50003 DROP FUNCTION IF EXISTS `AumentarCantidadProductoCarrito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `AumentarCantidadProductoCarrito`(
    p_usuarioId INT,
    p_productoId INT
) RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE v_idCarrito INT;
    DECLARE v_cantidad INT;

    -- Obtener el ID del carrito del usuario
    SELECT idCarrito INTO v_idCarrito
    FROM Carrito
    WHERE usuario_id = p_usuarioId
    ORDER BY horaCarrito DESC
    LIMIT 1;

    -- Verificar si el producto ya está en el carrito
    IF EXISTS (SELECT 1 FROM Carrito_Productos WHERE idCarrito = v_idCarrito AND idProducto = p_productoId) THEN
        -- Aumentar la cantidad en 1
        UPDATE Carrito_Productos
        SET cantidad = cantidad + 1
        WHERE idCarrito = v_idCarrito AND idProducto = p_productoId;

        -- Obtener la nueva cantidad
        SELECT cantidad INTO v_cantidad
        FROM Carrito_Productos
        WHERE idCarrito = v_idCarrito AND idProducto = p_productoId;

        RETURN v_cantidad;
    ELSE
        -- Lanzar un error con mensaje personalizado
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El producto no está en el carrito';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `DisminuirCantidadProductoCarrito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `DisminuirCantidadProductoCarrito`(
    p_usuarioId INT,
    p_productoId INT
) RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE v_idCarrito INT;
    DECLARE v_cantidad INT;

    -- Obtener el ID del carrito del usuario
    SELECT idCarrito INTO v_idCarrito
    FROM Carrito
    WHERE usuario_id = p_usuarioId
    ORDER BY horaCarrito DESC
    LIMIT 1;

    -- Verificar si el producto ya está en el carrito
    IF EXISTS (SELECT 1 FROM Carrito_Productos WHERE idCarrito = v_idCarrito AND idProducto = p_productoId) THEN
        -- Obtener la cantidad actual
        SELECT cantidad INTO v_cantidad
        FROM Carrito_Productos
        WHERE idCarrito = v_idCarrito AND idProducto = p_productoId;

        -- Si la cantidad es mayor que 1, disminuir en 1
        IF v_cantidad > 1 THEN
            UPDATE Carrito_Productos
            SET cantidad = cantidad - 1
            WHERE idCarrito = v_idCarrito AND idProducto = p_productoId;

            -- Obtener la nueva cantidad
            SELECT cantidad INTO v_cantidad
            FROM Carrito_Productos
            WHERE idCarrito = v_idCarrito AND idProducto = p_productoId;
            
            RETURN v_cantidad;
        ELSE
            -- Si la cantidad es 1, eliminar el producto del carrito
            DELETE FROM Carrito_Productos
            WHERE idCarrito = v_idCarrito AND idProducto = p_productoId;

            RETURN 0; -- Indicar que el producto se eliminó del carrito
        END IF;
    ELSE
        -- Lanzar un error con mensaje personalizado
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El producto no está en el carrito';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `TieneRol` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `TieneRol`(idUsuario INT, nombreRol VARCHAR(100)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    DECLARE esRol BOOLEAN;

    SELECT COUNT(*)
    INTO esRol
    FROM Usuarios u
    INNER JOIN Roles r ON u.rol_id = r.idRol
    WHERE u.idUsuario = idUsuario
      AND r.nombreRol = nombreRol
      AND u.estadoUsuario = TRUE
      AND r.estadoRol = TRUE;

    RETURN esRol > 0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `VerificarRol` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `VerificarRol`(idUsuario INT, nombreRol VARCHAR(100)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    DECLARE esRol BOOLEAN;

    SELECT COUNT(*)
    INTO esRol
    FROM Usuarios u
    INNER JOIN Roles r ON u.rol_id = r.idRol
    WHERE u.idUsuario = idUsuario
      AND r.nombreRol = nombreRol
      AND u.estadoUsuario = TRUE
      AND r.estadoRol = TRUE;

    RETURN esRol > 0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `VerificarRol1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `VerificarRol1`(idUsuario INT, nombreRol VARCHAR(100)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    DECLARE esRol TINYINT(1);

    SELECT COUNT(*)
    INTO esRol
    FROM Usuarios u
    INNER JOIN Roles r ON u.rol_id = r.idRol
    WHERE u.idUsuario = idUsuario
      AND r.nombreRol = nombreRol
      AND u.estadoUsuario = 1
      AND r.estadoRol = 1;

    RETURN IF(esRol > 0, 1, 0);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `VerificarRol2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `VerificarRol2`(idUsuario INT, nombreRol VARCHAR(100)) RETURNS tinyint
    DETERMINISTIC
BEGIN
    DECLARE esRol INT DEFAULT 0;

    SELECT COUNT(*) INTO esRol
    FROM Usuarios u
    INNER JOIN Roles r ON u.rol_id = r.idRol
    WHERE u.idUsuario = idUsuario
      AND r.nombreRol = nombreRol
      AND u.estadoUsuario = 1
      AND r.estadoRol = 1;

    RETURN esRol;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AgregarAFavoritos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarAFavoritos`(
    IN p_usuario_id INT,
    IN p_producto_id INT
)
BEGIN
    -- Verificar si ya está en favoritos
    IF NOT EXISTS (
        SELECT 1 FROM Favoritos 
        WHERE usuario_id = p_usuario_id 
        AND producto_id = p_producto_id
    ) THEN
        -- Insertar en favoritos
        INSERT INTO Favoritos (usuario_id, producto_id) 
        VALUES (p_usuario_id, p_producto_id);
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AgregarProductoAlCarrito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarProductoAlCarrito`(
    IN p_usuario_id INT,
    IN p_producto_id INT,
    IN p_cantidad INT
)
BEGIN
    DECLARE v_carrito_id INT;

    -- Verificar si el usuario ya tiene un carrito activo
    SELECT idCarrito INTO v_carrito_id 
    FROM Carrito 
    WHERE usuario_id = p_usuario_id 
    LIMIT 1;

    -- Si no tiene un carrito, crear uno nuevo
    IF v_carrito_id IS NULL THEN
        INSERT INTO Carrito (usuario_id, totalCarrito) VALUES (p_usuario_id, 0);
        SET v_carrito_id = LAST_INSERT_ID();
    END IF;

    -- Insertar o actualizar el producto en el carrito
    INSERT INTO Carrito_Productos (idCarrito, idProducto, cantidad)
    VALUES (v_carrito_id, p_producto_id, p_cantidad)
    ON DUPLICATE KEY UPDATE cantidad = cantidad + p_cantidad;

    -- Actualizar el total del carrito
    UPDATE Carrito 
    SET totalCarrito = (
        SELECT SUM(p.precioProducto * cp.cantidad)
        FROM Carrito_Productos cp
        JOIN Productos p ON cp.idProducto = p.idProducto
        WHERE cp.idCarrito = v_carrito_id
    )
    WHERE idCarrito = v_carrito_id;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AumentarCantidadProductoCarrito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AumentarCantidadProductoCarrito`(
    IN p_usuarioId INT,
    IN p_productoId INT
)
BEGIN
    -- Verificar si el producto ya está en el carrito del usuario
    IF EXISTS (SELECT 1 FROM Carrito WHERE usuario_id = p_usuarioId AND idCarrito = p_productoId) THEN
        -- Aumentar la cantidad en 1
        UPDATE Carrito 
        SET totalCarrito = totalCarrito + 1
        WHERE usuario_id = p_usuarioId AND idCarrito = p_productoId;
    ELSE
        -- Si no existe, lanzar un error
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El producto no está en el carrito';
    END IF;

    -- Retornar la cantidad actualizada
    SELECT totalCarrito AS cantidad FROM Carrito WHERE usuario_id = p_usuarioId AND idCarrito = p_productoId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `BuscarProductos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `BuscarProductos`(IN terminoBusqueda VARCHAR(255))
BEGIN
    SELECT 
        p.idProducto,
        p.nombreProducto,
        p.tallaProducto,
        p.precioProducto,
        p.stockProducto,
        p.imgProducto,
        c.nombreCategoria
    FROM 
        Productos p
    LEFT JOIN Categoria c ON p.categoria_id = c.idCategoria
    WHERE 
        p.estadoProducto = TRUE
        AND (p.nombreProducto LIKE CONCAT('%', terminoBusqueda, '%') 
             OR c.nombreCategoria LIKE CONCAT('%', terminoBusqueda, '%'))
    ORDER BY 
        p.nombreProducto ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `BuscarProductosFinal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `BuscarProductosFinal`(IN terminoBusqueda VARCHAR(255))
BEGIN
    SELECT 
        p.idProducto,
        p.nombreProducto,
        p.tallaProducto,
        p.precioProducto,
        p.stockProducto,
        p.imgProducto,
        p.marcaProducto,  -- Agregamos la marca
        c.nombreCategoria
    FROM 
        Productos p
    LEFT JOIN Categoria c ON p.categoria_id = c.idCategoria
    WHERE 
        p.estadoProducto = TRUE
        AND (
            p.nombreProducto LIKE CONCAT('%', terminoBusqueda, '%') 
            OR c.nombreCategoria LIKE CONCAT('%', terminoBusqueda, '%')
            OR p.marcaProducto LIKE CONCAT('%', terminoBusqueda, '%') -- Búsqueda por marca
        )
    ORDER BY 
        p.nombreProducto ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `BuscarProductosFinal1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `BuscarProductosFinal1`(IN terminoBusqueda VARCHAR(255))
BEGIN
    SELECT 
        p.idProducto,
        p.nombreProducto,
        p.tallaProducto,
        p.precioProducto,
        p.stockProducto,
        p.imgProducto,
        p.marcaProducto,  -- Agregamos la marca
        c.nombreCategoria
    FROM 
        Productos p
    LEFT JOIN Categoria c ON p.categoria_id = c.idCategoria
    WHERE 
        p.estadoProducto = TRUE
        AND (
            p.nombreProducto LIKE CONCAT('%', terminoBusqueda, '%') 
            OR c.nombreCategoria LIKE CONCAT('%', terminoBusqueda, '%')
            OR p.marcaProducto LIKE CONCAT('%', terminoBusqueda, '%') -- Búsqueda por marca
        )
    ORDER BY 
        p.nombreProducto ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CalcularTotalesCarrito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CalcularTotalesCarrito`(p_idUsuario INT)
BEGIN
    DECLARE v_subtotal DECIMAL(10,2);
    DECLARE v_cantidad_total INT;
    DECLARE v_total_con_iva DECIMAL(10,2);
    DECLARE v_faltante DECIMAL(10,2);
    DECLARE v_iva DECIMAL(5,2) DEFAULT 0.21; -- IVA del 21%

    -- Calcular el subtotal (sin IVA) y la cantidad total de artículos comprados
    SELECT 
        COALESCE(SUM(p.precioProducto * cp.cantidad), 0),
        COALESCE(SUM(cp.cantidad), 0)
    INTO 
        v_subtotal, 
        v_cantidad_total
    FROM Carrito c
    INNER JOIN Carrito_Productos cp ON c.idCarrito = cp.idCarrito
    INNER JOIN Productos p ON cp.idProducto = p.idProducto
    WHERE c.usuario_id = p_idUsuario AND c.estadoCarrito = 1;

    -- Calcular el total con IVA (21%)
    SET v_total_con_iva = v_subtotal * (1 + v_iva);

    -- Calcular cuánto falta para el envío gratuito
    SET v_faltante = GREATEST(45 - v_total_con_iva, 0);

    -- Devolver los valores como columnas separadas, incluyendo el mensaje de envío
    SELECT 
        v_subtotal AS Subtotal, 
        v_cantidad_total AS CantidadTotalArticulos, 
        v_total_con_iva AS TotalConIVA,
        CASE 
            WHEN v_faltante > 0 THEN CONCAT('Te faltan ', FORMAT(v_faltante, 2), ' € para disfrutar del envío gratuito.')
            ELSE '¡Envío gratuito disponible!'
        END AS MensajeEnvio;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CalcularTotalesCarritoactualizado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CalcularTotalesCarritoactualizado`(p_idUsuario INT)
BEGIN
    DECLARE v_subtotal DECIMAL(10,2);
    DECLARE v_cantidad_total INT;
    DECLARE v_total_con_iva DECIMAL(10,2);
    DECLARE v_iva DECIMAL(5,2) DEFAULT 0.21; -- IVA del 21%

    -- Calcular el subtotal (sin IVA) y la cantidad total de artículos comprados
    SELECT 
        COALESCE(SUM(p.precioProducto * cp.cantidad), 0),
        COALESCE(SUM(cp.cantidad), 0)
    INTO 
        v_subtotal, 
        v_cantidad_total
    FROM Carrito c
    INNER JOIN Carrito_Productos cp ON c.idCarrito = cp.idCarrito
    INNER JOIN Productos p ON cp.idProducto = p.idProducto
    WHERE c.usuario_id = p_idUsuario AND c.estadoCarrito = 1;

    -- Calcular el total con IVA
    SET v_total_con_iva = v_subtotal * (1 + v_iva);

    -- Devolver los valores como columnas separadas
    SELECT 
        v_subtotal AS Subtotal, 
        v_cantidad_total AS CantidadTotalArticulos, 
        v_total_con_iva AS TotalConIVA;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CalcularTotalesCarritoactualizado1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CalcularTotalesCarritoactualizado1`(p_idUsuario INT)
BEGIN
    DECLARE v_subtotal DECIMAL(10,2);
    DECLARE v_cantidad_total INT;
    DECLARE v_total_con_iva DECIMAL(10,2);
    DECLARE v_iva DECIMAL(5,2) DEFAULT 0.21; -- IVA del 21%

    -- Calcular el subtotal (sin IVA) y la cantidad total de artículos comprados
    SELECT 
        COALESCE(SUM(p.precioProducto * cp.cantidad), 0),
        COALESCE(SUM(cp.cantidad), 0)
    INTO 
        v_subtotal, 
        v_cantidad_total
    FROM Carrito c
    INNER JOIN Carrito_Productos cp ON c.idCarrito = cp.idCarrito
    INNER JOIN Productos p ON cp.idProducto = p.idProducto
    WHERE c.usuario_id = p_idUsuario AND c.estadoCarrito = 1;

    -- Calcular el total con IVA
    SET v_total_con_iva = v_subtotal * (1 + v_iva);

    -- Devolver los valores como columnas separadas
    SELECT 
        v_subtotal AS Subtotal, 
        v_cantidad_total AS CantidadTotalArticulos, 
        v_total_con_iva AS TotalConIVA;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CalcularTotalesCarritoCompleto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CalcularTotalesCarritoCompleto`(p_idUsuario INT)
BEGIN
    DECLARE v_subtotal DECIMAL(10,2);
    DECLARE v_cantidad_total INT;
    DECLARE v_total_con_iva DECIMAL(10,2);
    DECLARE v_iva DECIMAL(5,2) DEFAULT 0.21; -- IVA del 21%
    DECLARE v_mensaje_envio VARCHAR(50);

    -- Calcular el subtotal (sin IVA) y la cantidad total de artículos comprados
    SELECT 
        COALESCE(SUM(p.precioProducto * cp.cantidad), 0),
        COALESCE(SUM(cp.cantidad), 0)
    INTO 
        v_subtotal, 
        v_cantidad_total
    FROM Carrito c
    INNER JOIN Carrito_Productos cp ON c.idCarrito = cp.idCarrito
    INNER JOIN Productos p ON cp.idProducto = p.idProducto
    WHERE c.usuario_id = p_idUsuario AND c.estadoCarrito = 1;

    -- Calcular el total con IVA (21%)
    SET v_total_con_iva = v_subtotal * (1 + v_iva);

    -- Determinar el mensaje de envío
    IF v_total_con_iva >= 45 THEN
        SET v_mensaje_envio = ' (Envío incluido)';
    ELSE
        SET v_mensaje_envio = ' (Envío no incluido)';
    END IF;

    -- Devolver los valores como columnas separadas, incluyendo el mensaje de envío
    SELECT 
        v_subtotal AS Subtotal, 
        v_cantidad_total AS CantidadTotalArticulos, 
        v_total_con_iva AS TotalConIVA,
        v_mensaje_envio AS MensajeEnvio;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarProductoDelCarrito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarProductoDelCarrito`(
    IN p_idUsuario INT,
    IN p_idProducto INT
)
BEGIN
    DECLARE v_idCarrito INT;

    -- Buscar si el usuario ya tiene un carrito activo
    SELECT idCarrito INTO v_idCarrito
    FROM Carrito
    WHERE usuario_id = p_idUsuario AND estadoCarrito = 1
    LIMIT 1;

    -- Si tiene un carrito activo, proceder con la eliminación
    IF v_idCarrito IS NOT NULL THEN
        -- Eliminar todas las unidades del producto específico
        DELETE FROM Carrito_Productos 
        WHERE idCarrito = v_idCarrito AND idProducto = p_idProducto;

        -- Actualizar el total del carrito después de la eliminación
        UPDATE Carrito 
        SET totalCarrito = COALESCE((
            SELECT SUM(p.precioProducto * cp.cantidad) 
            FROM Carrito_Productos cp
            JOIN Productos p ON cp.idProducto = p.idProducto
            WHERE cp.idCarrito = v_idCarrito
        ), 0) -- Si no hay productos, el total será 0
        WHERE idCarrito = v_idCarrito;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `FiltrarProductosPorPrecio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `FiltrarProductosPorPrecio`(
    IN p_precio_min DECIMAL(10,2),
    IN p_precio_max DECIMAL(10,2)
)
BEGIN
    SELECT 
        p.idProducto,
        p.nombreProducto,
        p.tallaProducto,
        p.precioProducto,
        p.stockProducto,
        p.imgProducto,
        c.nombreCategoria,
        CASE 
            WHEN p.descuento_id IS NOT NULL THEN 'En promoción'
            ELSE 'Normal'
        END AS estadoPromocion
    FROM 
        Productos p
    LEFT JOIN Categoria c ON p.categoria_id = c.idCategoria
    WHERE 
        p.estadoProducto = TRUE 
        AND p.precioProducto BETWEEN p_precio_min AND p_precio_max
    ORDER BY 
        p.precioProducto ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarCarrito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarCarrito`(
    IN p_idUsuario INT,
    IN p_idProducto INT,
    IN p_cantidad INT
)
BEGIN
    DECLARE v_idCarrito INT;
    DECLARE v_precio DECIMAL(10,2);
    DECLARE v_cantidad_actual INT;

    -- Buscar si el usuario ya tiene un carrito activo
    SELECT idCarrito INTO v_idCarrito
    FROM Carrito
    WHERE usuario_id = p_idUsuario AND estadoCarrito = 1
    LIMIT 1;

    -- Si no tiene un carrito, crear uno nuevo
    IF v_idCarrito IS NULL THEN
        INSERT INTO Carrito (usuario_id, totalCarrito) VALUES (p_idUsuario, 0);
        SET v_idCarrito = LAST_INSERT_ID();
    END IF;

    -- Obtener el precio del producto
    SELECT precioProducto INTO v_precio FROM Productos WHERE idProducto = p_idProducto;

    -- Obtener la cantidad actual del producto en el carrito
    SELECT cantidad INTO v_cantidad_actual
    FROM Carrito_Productos
    WHERE idCarrito = v_idCarrito AND idProducto = p_idProducto;

    -- Si la cantidad nueva es 0, eliminar el producto del carrito
    IF p_cantidad = 0 THEN
        DELETE FROM Carrito_Productos WHERE idCarrito = v_idCarrito AND idProducto = p_idProducto;
    ELSE
        -- Si el producto ya está en el carrito, actualizar la cantidad
        IF v_cantidad_actual IS NOT NULL THEN
            UPDATE Carrito_Productos 
            SET cantidad = p_cantidad 
            WHERE idCarrito = v_idCarrito AND idProducto = p_idProducto;
        ELSE
            -- Si no existe en el carrito, agregarlo con la cantidad indicada
            INSERT INTO Carrito_Productos (idCarrito, idProducto, cantidad) 
            VALUES (v_idCarrito, p_idProducto, p_cantidad);
        END IF;
    END IF;

    -- Actualizar el total del carrito
    UPDATE Carrito 
    SET totalCarrito = COALESCE((
        SELECT SUM(p.precioProducto * cp.cantidad) 
        FROM Carrito_Productos cp
        JOIN Productos p ON cp.idProducto = p.idProducto
        WHERE cp.idCarrito = v_idCarrito
    ), 0) -- Si no hay productos, total será 0
    WHERE idCarrito = v_idCarrito;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarCarritoActualizado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarCarritoActualizado`(
    IN p_idUsuario INT,
    IN p_idProducto INT,
    IN p_cantidad INT
)
BEGIN
    DECLARE v_idCarrito INT;
    DECLARE v_precio DECIMAL(10,2);
    DECLARE v_cantidad_actual INT;

    -- Buscar si el usuario ya tiene un carrito activo
    SELECT idCarrito INTO v_idCarrito
    FROM Carrito
    WHERE usuario_id = p_idUsuario AND estadoCarrito = 1
    LIMIT 1;

    -- Si no tiene un carrito, crear uno nuevo
    IF v_idCarrito IS NULL THEN
        INSERT INTO Carrito (usuario_id, totalCarrito) VALUES (p_idUsuario, 0);
        SET v_idCarrito = LAST_INSERT_ID();
    END IF;

    -- Obtener el precio del producto
    SELECT precioProducto INTO v_precio FROM Productos WHERE idProducto = p_idProducto;

    -- Obtener la cantidad actual del producto en el carrito
    SELECT cantidad INTO v_cantidad_actual
    FROM Carrito_Productos
    WHERE idCarrito = v_idCarrito AND idProducto = p_idProducto;

    -- Si la cantidad nueva es 0, eliminar el producto del carrito
    IF p_cantidad = 0 THEN
        DELETE FROM Carrito_Productos WHERE idCarrito = v_idCarrito AND idProducto = p_idProducto;
    ELSE
        -- Si el producto ya está en el carrito, actualizar la cantidad
        IF v_cantidad_actual IS NOT NULL THEN
            UPDATE Carrito_Productos 
            SET cantidad = p_cantidad 
            WHERE idCarrito = v_idCarrito AND idProducto = p_idProducto;
        ELSE
            -- Si no existe en el carrito, agregarlo con la cantidad indicada
            INSERT INTO Carrito_Productos (idCarrito, idProducto, cantidad) 
            VALUES (v_idCarrito, p_idProducto, p_cantidad);
        END IF;
    END IF;

    -- Actualizar el total del carrito
    UPDATE Carrito 
    SET totalCarrito = COALESCE((
        SELECT SUM(p.precioProducto * cp.cantidad) 
        FROM Carrito_Productos cp
        JOIN Productos p ON cp.idProducto = p.idProducto
        WHERE cp.idCarrito = v_idCarrito
    ), 0) -- Si no hay productos, total será 0
    WHERE idCarrito = v_idCarrito;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ObtenerProductoPorID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ObtenerProductoPorID`(
    IN producto_id INT
)
BEGIN
    SELECT 
        p.idProducto,
        p.nombreProducto,
        p.tallaProducto,
        p.precioProducto,
        p.stockProducto,
        p.imgProducto,
        c.nombreCategoria,
        p.descripcionProducto
    FROM 
        Productos p
    LEFT JOIN Categoria c ON p.categoria_id = c.idCategoria
    WHERE 
        p.idProducto = producto_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `QuitarDeFavoritos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `QuitarDeFavoritos`(
    IN p_usuario_id INT,
    IN p_producto_id INT
)
BEGIN
    -- Eliminar el producto de favoritos si existe
    DELETE FROM Favoritos 
    WHERE usuario_id = p_usuario_id 
    AND producto_id = p_producto_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerMiCarrito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerMiCarrito`(IN usuarioID INT)
BEGIN
    -- Mostrar el carrito con los productos
    SELECT 
        p.idProducto,
        p.nombreProducto,
        p.tallaProducto,  -- Se agregó la talla
        p.precioProducto,
        cp.cantidad,
        (p.precioProducto * cp.cantidad) AS subtotal
	
    FROM Carrito c
    INNER JOIN Carrito_Productos cp ON c.idCarrito = cp.idCarrito
    INNER JOIN Productos p ON cp.idProducto = p.idProducto
    WHERE c.usuario_id = usuarioID AND c.estadoCarrito = TRUE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerMiCarritocompleto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerMiCarritocompleto`(IN usuarioID INT)
BEGIN
    DECLARE total DECIMAL(10,2);
    
    -- Calcular el total del carrito sin IVA
    SELECT SUM(p.precioProducto * cp.cantidad) INTO total
    FROM Carrito c
    INNER JOIN Carrito_Productos cp ON c.idCarrito = cp.idCarrito
    INNER JOIN Productos p ON cp.idProducto = p.idProducto
    WHERE c.usuario_id = usuarioID AND c.estadoCarrito = TRUE;

    -- Mostrar los productos del carrito con detalles completos
    SELECT 
        p.idProducto,
        p.nombreProducto AS Producto,
        p.tallaProducto AS Talla,  
        p.marcaProducto AS Marca,  
        cp.cantidad AS Cantidad,
        p.precioProducto AS PrecioUnitario,
        (p.precioProducto * cp.cantidad) AS Subtotal
  
    FROM Carrito c
    INNER JOIN Carrito_Productos cp ON c.idCarrito = cp.idCarrito
    INNER JOIN Productos p ON cp.idProducto = p.idProducto
    WHERE c.usuario_id = usuarioID AND c.estadoCarrito = TRUE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerMiCarritocompletoactualizado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerMiCarritocompletoactualizado`(IN usuarioID INT)
BEGIN
    DECLARE total DECIMAL(10,2) DEFAULT 0;
    DECLARE faltante DECIMAL(10,2) DEFAULT 0;
    DECLARE cantidad_productos INT DEFAULT 0;

    -- Calcular el total del carrito sin IVA y la cantidad de productos diferentes
    SELECT 
        COALESCE(SUM(p.precioProducto * cp.cantidad), 0),
        COUNT(DISTINCT cp.idProducto)
    INTO 
        total,
        cantidad_productos
    FROM 
        Carrito c
    INNER JOIN 
        Carrito_Productos cp ON c.idCarrito = cp.idCarrito
    INNER JOIN 
        Productos p ON cp.idProducto = p.idProducto
    WHERE 
        c.usuario_id = usuarioID AND c.estadoCarrito = TRUE;

    -- Calcular cuánto falta para el envío gratuito
    SET faltante = GREATEST(45 - total, 0);

    -- Mostrar los productos del carrito con detalles completos
    SELECT 
        p.idProducto,
        p.nombreProducto AS Producto,
        p.tallaProducto AS Talla,
        p.marcaProducto AS Marca,
        cp.cantidad AS Cantidad,
        p.precioProducto AS PrecioUnitario,
        (p.precioProducto * cp.cantidad) AS Subtotal, -- Subtotal sin IVA
       
        cantidad_productos AS CantidadProductos, -- Número de productos diferentes en el carrito
        CASE 
            WHEN faltante > 0 THEN CONCAT('Te faltan ', FORMAT(faltante, 2), ' € para disfrutar del envío gratuito.')
            ELSE '¡Envío gratuito disponible!'
        END AS MensajeEnvio  -- Mensaje personalizado según el total
    FROM 
        Carrito c
    INNER JOIN 
        Carrito_Productos cp ON c.idCarrito = cp.idCarrito
    INNER JOIN 
        Productos p ON cp.idProducto = p.idProducto
    WHERE 
        c.usuario_id = usuarioID AND c.estadoCarrito = TRUE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerMiCuenta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerMiCuenta`(IN p_idUsuario INT)
BEGIN
    SELECT 
        idUsuario,
        nombreUsuario,
        apellidoUsuario,
        correoUsuario,
        estadoUsuario,
        (SELECT nombreRol FROM Roles WHERE idRol = u.rol_id) AS rolUsuario
    FROM Usuarios u
    WHERE idUsuario = p_idUsuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerMisFavoritos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerMisFavoritos`(IN usuarioID INT)
BEGIN
    SELECT 
        p.idProducto,
        p.nombreProducto,
        p.tallaProducto,
        p.precioProducto,
        p.stockProducto,
        p.imgProducto,
        c.nombreCategoria
    FROM 
        Favoritos f
    INNER JOIN Productos p ON f.producto_id = p.idProducto
    LEFT JOIN Categoria c ON p.categoria_id = c.idCategoria
    WHERE 
        f.usuario_id = usuarioID
        AND p.estadoProducto = TRUE
    ORDER BY 
        p.nombreProducto ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerMisFavoritos2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerMisFavoritos2`(IN usuarioID INT)
BEGIN
    SELECT 
        p.idProducto,
        p.nombreProducto,
        p.tallaProducto,
        p.precioProducto,
        p.stockProducto,
        p.imgProducto,
        c.nombreCategoria,
        f.cantidad
    FROM 
        Favoritos f
    INNER JOIN Productos p ON f.producto_id = p.idProducto
    LEFT JOIN Categoria c ON p.categoria_id = c.idCategoria
    WHERE 
        f.usuario_id = usuarioID
        AND p.estadoProducto = TRUE
    ORDER BY 
        p.nombreProducto ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-05 21:02:37
