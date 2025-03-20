import CarritoRouterFactory from '../src/ModuloCarrito/Infrastructura/Factory/CarritoRouterFactory';
import AuthRouterFactory from './Autenticacion/Infrastructura/Factory/AuthRouterFactory';
import ServerFactory from './Express/infrastructure/factory/ServerFactory';
import FavoritoRouterFactory from './ModuloFavorito/Infrastructura/Factory/FavoritoRouterFactory';
import ProductoRouterFactory from './ModuloProductos/Infrastructura/Factory/CarritoRouterFactory';

import UsuarioRouterFactory from './ModuloUsuario/Infrastructura/Factory/UsuarioRouterFactory';

const carritoRouter = CarritoRouterFactory.create();
const productoRouter = ProductoRouterFactory.create();
const favoritoRouter = FavoritoRouterFactory.create();
const usuarioRouter = UsuarioRouterFactory.create();
const authRouter = AuthRouterFactory.create(); // Crear el enrutador de autenticación

const routers = [carritoRouter, productoRouter, favoritoRouter, usuarioRouter, authRouter]; // Agregar el enrutador de autenticación

const server = ServerFactory.create(routers);

server.start();