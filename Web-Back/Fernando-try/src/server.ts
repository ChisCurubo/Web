import CarritoRouterFactory from '../src/ModuloCarrito/Infrastructura/Factory/CarritoRouterFactory';

import ServerFactory from './Express/infrastructure/factory/ServerFactory';
import ProductoRouterFactory from './ModuloProductos/Infrastructura/Factory/CarritoRouterFactory';


const carritoRouter = CarritoRouterFactory.create();
const productoRouter = ProductoRouterFactory.create();  


const routers = [carritoRouter, productoRouter]; 

const server = ServerFactory.create(routers);

server.start();
