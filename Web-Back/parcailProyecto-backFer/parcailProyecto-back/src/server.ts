import CarritoRouterFactory from '../src/ModuloCarrito/Infrastructura/Factory/CarritoRouterFactory';
import AuthRouterFactory from './Modulo Autenticacion/Infrastructura/Factory/AuthRouterFactory';
import ServerFactory from './Express/infrastructure/factory/ServerFactory';
import FavoritoRouterFactory from './ModuloFavorito/Infrastructura/Factory/FavoritoRouterFactory';
 // Asegúrate de que esta ruta sea correcta
import UsuarioRouterFactory from './ModuloUsuario/Infrastructura/Factory/UsuarioRouterFactory';
import PagoRouterFactory from './Modulo Pago/Infrastructura/Factory/PagoRouterFactory';
import ProductoRouterFactory from './ModuloProductos/Infrastructura/Factory/CarritoRouterFactory';

import ImagenFactory from './images/infarstructura/factory/ImagenRouterFactory';

const carritoRouter = CarritoRouterFactory.create();
const productoRouter = ProductoRouterFactory.create();
const favoritoRouter = FavoritoRouterFactory.create();
const usuarioRouter = UsuarioRouterFactory.create();
const authRouter = AuthRouterFactory.create(); 
const pagoRouter = PagoRouterFactory.create(); 





// Usar el factory para crear solo el enrutador de imágenes
const imagenRouter = ImagenFactory.create();

const routers = [
  carritoRouter, 
  productoRouter, 
  favoritoRouter, 
  usuarioRouter, 
  authRouter,
  pagoRouter,
  imagenRouter
];

const server = ServerFactory.create(routers);

server.start();