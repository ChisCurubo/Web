import { Router } from 'express';

import ProductoControladorExpressInterface from '../../Domain/interfaces/ProductoControladorExpressInterface';
import ProductoRouterExpressInterface from '../../Domain/interfaces/ProductoRouterExpressInterface';

export default class  implements ProductoRouterExpressInterface {
  router: Router;
  path: string;

  constructor(private readonly productoControlador: ProductoControladorExpressInterface) {
    this.router = Router();
    this.path = '/producto';
    this.routes();
  }

  public routes(): void {
    this.obtenerProductoPorId();
    this.obtenerProductoPorNombre();
    this.obtenerProductosPorRangoDePrecio();
    this.buscarProductos();
    this.obtenerVitrina();
  }

  public obtenerProductoPorId(): void {
    this.router.get('/id/:id', this.productoControlador.obtenerProductoPorId.bind(this.productoControlador));
  }

  public obtenerProductoPorNombre(): void {
    this.router.get('/nombre/:nombre', this.productoControlador.obtenerProductoPorNombre.bind(this.productoControlador));
  }

  public obtenerProductosPorRangoDePrecio(): void {
    this.router.get('/rango-precio/:precioMin/:precioMax', this.productoControlador.obtenerProductosPorRangoDePrecio.bind(this.productoControlador));

  }

  public buscarProductos(): void {
    this.router.get('/buscar/:termino', this.productoControlador.buscarProductos.bind(this.productoControlador));
  }

  public obtenerVitrina(): void {
    this.router.get('/obtenervitrina', this.productoControlador.obtenerVitrina.bind(this.productoControlador));
  }

  
}
