import { Router } from 'express';
import CarritoRouterExpressInterface from '../../Domain/interfaces/CarritoRouterExpressInterface';
import CarritoControladorExpressInterface from '../../Domain/interfaces/CarritoControladorExpressInterface';

export default class CarritoRouterExpress implements CarritoRouterExpressInterface {
  router: Router;
  path: string;

  constructor(private readonly carritoControlador: CarritoControladorExpressInterface) {
    this.router = Router();
    this.path = '/carrito';
    this.routes();
  }
  

 

  public routes(): void {
    this.verCarrito();
    this.verCarritoResumido();
    this.calcularTotales();
    this.calcularTotalesCarritoCompleto();
    this.agregarProducto();
    this.eliminarProducto();
    this.aumentarCantidad();
    this.disminuirCantidad();
  }

  public verCarrito(): void {
    this.router.get('/:usuarioId', this.carritoControlador.verCarrito.bind(this.carritoControlador));
  }

  public verCarritoResumido(): void {
    this.router.get('/resumen/:usuarioId', this.carritoControlador.verCarritoResumido.bind(this.carritoControlador));
  }

  public calcularTotales(): void {
    this.router.get('/totales/:usuarioId', this.carritoControlador.calcularTotales.bind(this.carritoControlador));
  }

  public calcularTotalesCarritoCompleto(): void {
    this.router.get('/totales-completo/:usuarioId', this.carritoControlador.calcularTotalesCarritoCompleto.bind(this.carritoControlador));
  }

  public agregarProducto(): void {
    this.router.post('/agregar', this.carritoControlador.agregarProducto.bind(this.carritoControlador));
  }

  public eliminarProducto(): void {
    this.router.delete('/eliminar', this.carritoControlador.eliminarProducto.bind(this.carritoControlador));
  }

  public aumentarCantidad(): void {
    this.router.put('/aumentar', this.carritoControlador.aumentarCantidad.bind(this.carritoControlador));
  }

  public disminuirCantidad(): void {
    this.router.put('/disminuir', this.carritoControlador.disminuirCantidad.bind(this.carritoControlador));
  }
}
