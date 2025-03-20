import ProductoServiceInterface from "../Domain/interfaces/ProductoServiceInterface";
import ProductoUseCasePort from "../Domain/Port/Driver/ProductoUseCasePort";
import AbstractProducto from "../Domain/Producto/AbstractProducto";
import { IProductoDetalle } from "../Domain/Producto/interfaces/productoIntefaces";
import NullProducto from "../Domain/Producto/NullProducto";

export default class ProductoUseCase implements ProductoUseCasePort {
  constructor(private readonly productoService: ProductoServiceInterface) {}

  public async obtenerProductoPorId(id: number): Promise<IProductoDetalle> {
    const producto = await this.productoService.obtenerProductoPorId(id);

    if (!producto) {
      return new NullProducto().toDetalle();
    }

    return producto;
  }

  public async obtenerProductoPorNombre(nombre: string): Promise<AbstractProducto> {
    const producto = await this.productoService.obtenerProductoPorNombre(nombre);

    if (!producto) {
      return new NullProducto();
    }

    return producto;
  }

  public async obtenerProductosPorRangoDePrecio(min: number, max: number): Promise<AbstractProducto[]> {
    const productos = await this.productoService.obtenerProductosPorRangoDePrecio(min, max);

    if (productos.length === 0) {
      return [new NullProducto()];
    }

    return productos;
  }

  public async buscarProductos(termino: string): Promise<AbstractProducto[]> {
    const productos = await this.productoService.buscarProductos(termino);

    if (productos.length === 0) {
      return [new NullProducto()];
    }

    return productos;
  }

  public async obtenerVitrina(): Promise<AbstractProducto[]> {
    const productos = await this.productoService.obtenerVitrina();

    if (productos.length === 0) {
      return [new NullProducto()];
    }

    return productos;
  }
}
