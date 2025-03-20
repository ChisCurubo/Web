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

