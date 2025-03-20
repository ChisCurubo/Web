-- 🛒 Categorías (BuenaVista_Categoria)
-- 🔹 Insertar una nueva categoría
INSERT INTO BuenaVista_Categoria (nombreCategoria, tipo) 
VALUES ('Cuidado de la Piel', 1);

-- 🔹 Obtener todas las categorías
SELECT * FROM BuenaVista_Categoria;

-- 🔹 Obtener una categoría por ID
SELECT * FROM BuenaVista_Categoria WHERE idCategoria = 2;

-- 🔹 Actualizar una categoría
UPDATE BuenaVista_Categoria 
SET nombreCategoria = 'Cuidado Facial'
WHERE idCategoria = 2;

-- 🔹 Eliminar una categoría
DELETE FROM BuenaVista_Categoria WHERE idCategoria = 2;

-- 🛍️ Productos (BuenaVista_Productos)
-- 🔹 Insertar un nuevo producto
INSERT INTO BuenaVista_Productos (nombreProducto, descripcionProducto, precioProducto, stockProducto, categoria_id, descuento_id) 
VALUES ('Aceite Esencial de Lavanda', 'Relajante y natural.', 25.50, 50, 1, NULL);

-- 🔹 Obtener todos los productos
SELECT * FROM BuenaVista_Productos;

-- 🔹 Obtener un producto por ID
SELECT * FROM BuenaVista_Productos WHERE idProducto = 5;

-- 🔹 Actualizar un producto
UPDATE BuenaVista_Productos 
SET precioProducto = 27.99, stockProducto = 40
WHERE idProducto = 5;

-- 🔹 Eliminar un producto
DELETE FROM BuenaVista_Productos WHERE idProducto = 5;

-- 🛒 Carrito (BuenaVista_Carrito)
-- 🔹 Insertar un nuevo carrito
INSERT INTO BuenaVista_Carrito (usuario_id, totalCarrito) 
VALUES ('1001', 0.00);

-- 🔹 Obtener todos los carritos
SELECT * FROM BuenaVista_Carrito;

-- 🔹 Obtener un carrito por usuario
SELECT * FROM BuenaVista_Carrito WHERE usuario_id = '1001';

-- 🔹 Actualizar total del carrito
UPDATE BuenaVista_Carrito 
SET totalCarrito = 120.50
WHERE idCarrito = 3;

-- 🔹 Eliminar un carrito
DELETE FROM BuenaVista_Carrito WHERE idCarrito = 3;

-- 🛍️ Items del Carrito (itemCarrito)
-- 🔹 Insertar un producto en el carrito
INSERT INTO itemCarrito (idCarrito, idProducto, cantidad, subTotal) 
VALUES (1, 5, 2, 51.00);

-- 🔹 Obtener los productos en un carrito
SELECT ic.idItem, p.nombreProducto, ic.cantidad, ic.subTotal
FROM itemCarrito ic
JOIN BuenaVista_Productos p ON ic.idProducto = p.idProducto
WHERE ic.idCarrito = 1;

-- 🔹 Actualizar la cantidad de un producto en el carrito
UPDATE itemCarrito 
SET cantidad = 3, subTotal = 76.50
WHERE idItem = 2;

-- 🔹 Eliminar un producto del carrito
DELETE FROM itemCarrito WHERE idItem = 2;
Use BuenaVista;
select * from BuenaVista_Favoritos;
-- ❤️ Favoritos (BuenaVista_Favoritos)
-- 🔹 Agregar un producto a favoritos
INSERT INTO BuenaVista_Favoritos (usuario_id, producto_id) 
VALUES ('1001', 5);

-- 🔹 Obtener todos los favoritos de un usuario
SELECT f.idFavoritos, p.nombreProducto 
FROM BuenaVista_Favoritos f
JOIN BuenaVista_Productos p ON f.producto_id = p.idProducto
WHERE f.usuario_id = '1001';

-- 🔹 Eliminar un producto de favoritos
DELETE FROM BuenaVista_Favoritos WHERE idFavoritos = 3;

-- 💳 Pagos (BuenaVista_Pago)
-- 🔹 Insertar un pago
INSERT INTO BuenaVista_Pago (carrito_id, totalPago, metodoPago, estadoPago) 
VALUES (1, 150.75, 'Tarjeta de Crédito', 1);

-- 🔹 Obtener todos los pagos
SELECT * FROM BuenaVista_Pago;

-- 🔹 Obtener pagos por usuario
SELECT p.idPago, p.totalPago, p.metodoPago, p.estadoPago, p.fechaPago
FROM BuenaVista_Pago p
JOIN BuenaVista_Carrito c ON p.carrito_id = c.idCarrito
WHERE c.usuario_id = '1001';

-- 🔹 Actualizar estado de pago
UPDATE BuenaVista_Pago 
SET estadoPago = 1
WHERE idPago = 5;

-- 🔹 Eliminar un pago
DELETE FROM BuenaVista_Pago WHERE idPago = 5;