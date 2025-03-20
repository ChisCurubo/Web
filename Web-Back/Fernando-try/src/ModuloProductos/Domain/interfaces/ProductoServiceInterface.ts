import AbstractProducto from "../Producto/AbstractProducto";
import { IProductoDetalle } from "../Producto/interfaces/productoIntefaces";

export default interface ProductoServiceInterface {
  obtenerProductoPorId(id: number): Promise<IProductoDetalle>;
  obtenerProductoPorNombre(nombre: string): Promise<AbstractProducto>;

  obtenerProductosPorRangoDePrecio(min: number, max: number): Promise<AbstractProducto[]>;
  buscarProductos(termino: string): Promise<AbstractProducto[]>;
  obtenerVitrina(): Promise<AbstractProducto[]>;
}
