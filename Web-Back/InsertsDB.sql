USE BuenaVista;

-- Insertar Tipos de Producto
INSERT INTO BuenaVista_TipoProducto (nombreTipoProducto) VALUES
('Frutas y Verduras Frescas'), 
('Cereales Integrales'), 
('Semillas'), 
('Frutos Secos'), 
('Leches Vegetales'), 
('Productos sin Gluten'),
('Vitaminas'),
('Minerales'),
('Extractos Herbales'),
('Probióticos'),
('Superalimentos'),
('Jabones Artesanales'),
('Cremas Hidratantes'),
('Aceites Esenciales'),
('Champús'),
('Acondicionadores'),
('Detergentes Ecológicos'),
('Ambientadores Naturales'),
('Productos de Limpieza Biodegradables'),
('Guías de Alimentación Saludable'),
('Libros de Recetas Vegetarianas y Veganas'),
('Publicaciones sobre Bienestar Natural');

-- Insertar Categorías y Asociarlas a sus Tipos
INSERT INTO BuenaVista_Categoria (nombreCategoria, tipo) VALUES
('Alimentos Orgánicos', 1),  -- Frutas y Verduras Frescas
('Alimentos Orgánicos', 2),  -- Cereales Integrales
('Alimentos Orgánicos', 3),  -- Semillas
('Alimentos Orgánicos', 4),  -- Frutos Secos
('Alimentos Orgánicos', 5),  -- Leches Vegetales
('Alimentos Orgánicos', 6),  -- Productos sin Gluten
('Suplementos Naturales', 7),  -- Vitaminas
('Suplementos Naturales', 8),  -- Minerales
('Suplementos Naturales', 9),  -- Extractos Herbales
('Suplementos Naturales', 10), -- Probióticos
('Suplementos Naturales', 11), -- Superalimentos
('Cosmética Natural', 12),  -- Jabones Artesanales
('Cosmética Natural', 13),  -- Cremas Hidratantes
('Cosmética Natural', 14),  -- Aceites Esenciales
('Cosmética Natural', 15),  -- Champús
('Cosmética Natural', 16),  -- Acondicionadores
('Productos para el Hogar', 17), -- Detergentes Ecológicos
('Productos para el Hogar', 18), -- Ambientadores Naturales
('Productos para el Hogar', 19), -- Productos de Limpieza Biodegradables
('Libros y Recursos', 20),  -- Guías de Alimentación Saludable
('Libros y Recursos', 21),  -- Libros de Recetas Vegetarianas y Veganas
('Libros y Recursos', 22);  -- Publicaciones sobre Bienestar Natural



INSERT INTO BuenaVista_Roles (nombreRol, descripcion, estadoRol) VALUES
('Administrador', 'Acceso total al sistema, gestión de usuarios, productos y pedidos.', 1),
('Comprador', 'Puede navegar, agregar productos al carrito y realizar compras.', 1),
('Invitado', 'Acceso limitado, solo puede ver productos sin realizar compras.', 1);



-- Insertar nuevos permisos
INSERT INTO BuenaVista_Permisos (nombrePermiso, estadoPermiso) VALUES
('Gestionar Usuarios', 1),
('Gestionar Productos', 1),
('Gestionar Pedidos', 1),
('Ver Productos',  1),
('Ver Productos',  1),
('Ver Productos',  1),
('Agregar al Carrito', 1),
('Realizar Compras', 1);

-- Asignar permisos al Administrador
INSERT INTO BuenaVista_Roles_Permisos (idPermisos, idRol)
SELECT idPermiso, idRol
FROM BuenaVista_Permisos, BuenaVista_Roles
WHERE nombrePermiso IN ('Gestionar Usuarios', 'Gestionar Productos', 'Gestionar Pedidos', 'Ver Productos')
AND nombreRol = 'Administrador';

-- Asignar permisos al Comprador
INSERT INTO BuenaVista_Roles_Permisos (idPermisos, idRol)
SELECT idPermiso, idRol
FROM BuenaVista_Permisos, BuenaVista_Roles
WHERE nombrePermiso IN ('Ver Productos', 'Agregar al Carrito', 'Realizar Compras')
AND nombreRol = 'Comprador';

-- Asignar permisos al Invitado (solo ver productos)
INSERT INTO BuenaVista_Roles_Permisos (idPermisos, idRol)
SELECT idPermiso, idRol
FROM BuenaVista_Permisos, BuenaVista_Roles
WHERE nombrePermiso = 'Ver Productos'
AND nombreRol = 'Invitado';

INSERT INTO BuenaVista_Usuarios (ci, nombreUsuario, apellidoUsuario, correoUsuario, contrasenaUsuario, estadoUsuario, rol_id)
SELECT '1001', 'Admin', 'Principal', 'admin@buenavista.com', 'admin123', 1, idRol
FROM BuenaVista_Roles WHERE nombreRol = 'Administrador';

INSERT INTO BuenaVista_Usuarios (ci, nombreUsuario, apellidoUsuario, correoUsuario, contrasenaUsuario, estadoUsuario, rol_id)
SELECT '2002', 'Carlos', 'Comprador', 'comprador@buenavista.com', 'comprador123', 1, idRol
FROM BuenaVista_Roles WHERE nombreRol = 'Comprador';

INSERT INTO BuenaVista_Usuarios (ci, nombreUsuario, apellidoUsuario, correoUsuario, contrasenaUsuario, estadoUsuario, rol_id)
SELECT '3003', 'Iván', 'Invitado', 'invitado@buenavista.com', 'invitado123', 1, idRol
FROM BuenaVista_Roles WHERE nombreRol = 'Invitado';

INSERT INTO BuenaVista_Descuentos (nombreDescuento, tipoDescuento, valorDescuento, condicionDescuento, estadoDescuento) VALUES
('Descuento de Bienvenida', 'porcentaje', 10, 'Aplica solo en la primera compra del usuario', 1),
('Promoción de Temporada', 'porcentaje', 15, 'Disponible en eventos especiales o cambios de estación', 1),
('Descuento por Compras Mayores a $100', 'porcentaje', 10, 'Se aplica si el total de la compra supera los $100', 1),
('Oferta Especial de Fin de Semana', 'porcentaje', 5, 'Válido solo los sábados y domingos', 1),
('Descuento por Cliente Frecuente', 'porcentaje', 8, 'Disponible para clientes con más de 5 compras', 1),
('Liquidación de Stock', 'porcentaje', 20, 'Se aplica a productos en liquidación', 1),
('Descuento por Pago en Efectivo', 'valor_fijo', 5, 'Solo para pagos en efectivo', 1),
('Cupón de Descuento 10%', 'porcentaje', 10, 'Debe ingresar un cupón válido', 1),
('Black Friday', 'porcentaje', 30, 'Válido solo en la fecha de Black Friday', 1),
('Cyber Monday', 'porcentaje', 25, 'Válido solo en la fecha de Cyber Monday', 1);


-- Insertar productos en la tabla BuenaVista_Productos
INSERT INTO BuenaVista_Productos 
(nombreProducto, descripcionProducto, tallaProducto, precioProducto, estadoProducto, imgProducto, stockProducto, marcaProducto, categoria_id, descuento_id)
VALUES
('Aceite esencial de Clavo', 'Aceite con propiedades antimicrobianas, antifúngicas y estimulantes.', '12ML', 7.99, 1, 'https://drive.google.com/file/d/1yvBN2jcQF9ysudd6cWSG6WSvwFiO64u0/view?usp=sharing', 100, 'Natura', 1, NULL),
('Parches de Oro de 24 kt Rejuvenecedores para Contorno de Ojos', 'Parches para ojos con efecto rejuvenecedor con oro de 24kt.', '60UDS.', 15.50, 1, NULL, 50, 'Natura Siberica', 2, 1),
('Parches Iluminadores para el Contorno de Ojos', 'Parches iluminadores que hidratan y protegen la piel.', '60UDS.', 15.50, 1, NULL, 50, 'Natura Siberica', 2, NULL),
('Parches Supertonificantes para Contorno de Ojos', 'Parches tonificantes para reducir fatiga e iluminar la piel.', '60UDS.', 15.50, 1, NULL, 50, 'Natura Siberica', 2, NULL),
('6 Discos Desmaquillantes de Fibra Natural', 'Discos reutilizables de algodón y carbón de bambú.', '6UDS.', 10.50, 1, NULL, 70, 'Eco Beauty', 2, 2),
('Aceite anticelulítico de abedul', 'Aceite que mejora la circulación y previene la celulitis.', '100ML', 22.90, 1, NULL, 40, 'Weleda', 4, 3),
('Aceite antiinflamatorio S.O.S Rescate', 'Aceite multiuso para quemaduras, golpes y cicatrices.', '30ML', 12.45, 1, NULL, 60, 'Eco Rescue', 1, NULL),
('Aceite Bucal de Coco Orgánico Premium', 'Aceite bucal con menta y eucalipto para higiene oral.', '180ML', 9.60, 1, NULL, 80, 'Dr. Goerg', 3, 4),
('Aceite corporal blanco siberiano anticelulítico', 'Aceite con extractos naturales para mejorar la piel.', '200ML', 6.95, 1, NULL, 50, 'Natura Siberica', 4, NULL);



INSERT INTO BuenaVista_Carrito (usuario_id, totalCarrito) VALUES 
('1001', 0.00),  -- Carrito vacío para Admin
('2002', 0.00);  -- Carrito vacío para Carlos


INSERT INTO itemCarrito(idCarrito, idProducto, cantidad, subTotal) VALUES
(1, 28, 2, 0),  -- 2 Aceites esenciales de Clavo
(1, 32, 1, 0),  -- 1 Paquete de discos desmaquillantes
(2, 30, 3, 0),  -- 3 Parches iluminadores
(2, 35, 2, 0); -- 2 Aceites Bucales Orgánicos

INSERT INTO BuenaVista_Favoritos (usuario_id, producto_id) VALUES
('1001', 28), -- Admin guarda Aceite esencial de Clavo
('1001', 32), -- Admin guarda Discos desmaquillantes
('2002', 30), -- Carlos guarda Parches iluminadores
('2002', 34), -- Carlos guarda Aceite antiinflamatorio
('3003', 35); -- Iván guarda Aceite Bucal Orgánico

INSERT INTO BuenaVista_Pago (carrito_id, totalPago, metodoPago, estadoPago) VALUES 
(1, 50.00, 'Tarjeta de Crédito', 1), 
(2, 120.50, 'PayPal', 1),           
(3, 30.75, 'Transferencia Bancaria', 0);








