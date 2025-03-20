// main.ts
import express from 'express';
import { createPool } from 'mysql2/promise';

// Repositorios e interfaces
import { MySQLProductoRepository } from './ModuloCarrito/Infrastructura/Repository/MySQLProductoRepository';
import { MySQLCarritoRepository } from './ModuloCarrito/Infrastructura/Repository/MySQLCarritoRepository';

// Interfaces de servicio
import ProductoServiceInterface from './ModuloCarrito/Domain/interfaces/ProductoServiceInterface';
import CarritoServiceInterface from './ModuloCarrito/Domain/interfaces/CarritoServiceInterface';

// Servicios
import ProductoService from './ModuloCarrito/application-Usecase/service/ProductoService';
import { CarritoService } from './ModuloCarrito/application-Usecase/service/CarritoService';

// Casos de uso y controladores
import { CarritoUseCase } from './ModuloCarrito/application-Usecase/CarritoUseCase';
import { CarritoController } from './ModuloCarrito/Infrastructura/Controller/CarritoController';

// Interfaces de repositorio
import { IProductoRepository } from './ModuloCarrito/Domain/Port/Driven/IProductoRepository';
import { ICarritoRepository } from './ModuloCarrito/Domain/Port/Driven/ICarritoRepository';

const app = express();
const PORT = 3005;

// Middleware
app.use(express.json());

// Conexión a MySQL
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'BuenavidaParcial',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Repositorios implementando interfaces
const productoRepository: IProductoRepository = new MySQLProductoRepository(pool);
const carritoRepository: ICarritoRepository = new MySQLCarritoRepository(pool, productoRepository);


const productoService: ProductoServiceInterface = new ProductoService(productoRepository);

// Asegúrate de que CarritoService implemente CarritoServiceInterface
const carritoService: CarritoServiceInterface = new CarritoService(productoRepository, carritoRepository);

// Caso de uso con inyección de dependencias
const carritoUseCase = new CarritoUseCase(productoService, carritoService);

// Controlador con inyección de dependencias
const carritoController = new CarritoController(carritoUseCase);

// Rutas
app.use('/api', carritoController.router);

// Iniciar el servidor con verificación de conexión
const startServer = async () => {
    try {
        console.log('Conectando a la base de datos...');
        await pool.getConnection(); // Verificar conexión inicial
        console.log('Base de datos conectada exitosamente');

        app.listen(PORT, () => {
            console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
        process.exit(1);
    }
};

startServer();