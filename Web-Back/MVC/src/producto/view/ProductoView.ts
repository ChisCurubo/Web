import { Router } from 'express';
import ProductoController from '../controller/ProductoController';

export default class ProductoRoutes {
  public router: Router;
  

  constructor(private readonly productoController: ProductoController) {
    this.router = Router();
    this.routes();
  }

  public routes() {
    // Rutas CRUD
    this.router.get(
      '/productos',
      this.productoController.getTodosLosProductos.bind(this.productoController)
    );

    this.router.get(
      '/productos/:id',
      this.productoController.getProductoPorId.bind(this.productoController)
    );

    this.router.post(
      '/productos',
      this.productoController.crearProducto.bind(this.productoController)
    );

    this.router.put(
      '/productos/:id',
      this.productoController.actualizarProducto.bind(this.productoController)
    );

    this.router.delete(
      '/productos/:id',
      this.productoController.borrarProducto.bind(this.productoController)
    );

    // Rutas adicionales
    this.router.get(
      '/productos/buscar/nombre/:nombre',
      this.productoController.buscarProductosPorNombre.bind(this.productoController)
    );

    this.router.get(
      '/productos/buscar/categoria/:categoriaId',
      this.productoController.buscarProductosPorCategoria.bind(this.productoController)
    );

    this.router.get(
      '/productos/buscar/marca/:marca',
      this.productoController.buscarProductosPorMarca.bind(this.productoController)
    );

    this.router.get(
      '/productos/:id/categoria',
      this.productoController.verCategoriaDelProducto.bind(this.productoController)
    );

    this.router.get(
      '/productos/:id/descuento',
      this.productoController.verDescuentoDelProducto.bind(this.productoController)
    );

    this.router.get(
      '/productos/:id/disponibilidad',
      this.productoController.verificarDisponibilidad.bind(this.productoController)
    );

    this.router.get(
      '/productos/:id/calcular-descuento',
      this.productoController.calcularPrecioConDescuento.bind(this.productoController)
    );
  }
}
