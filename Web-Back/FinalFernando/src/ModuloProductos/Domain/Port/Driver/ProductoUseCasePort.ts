import AbstractProducto from "../../Producto/AbstractProducto";
import { IProductoDetalle, IProductoVitrina } from "../../Producto/interfaces/productoIntefaces";


export default interface ProductoUseCasePort {
  obtenerProductoPorId(id: number): Promise<IProductoDetalle>;
  obtenerProductoPorNombre(nombre: string): Promise<AbstractProducto>;
  obtenerProductosPorRangoDePrecio(min: number, max: number): Promise<AbstractProducto[]>;
  buscarProductos(termino: string): Promise<AbstractProducto[]>;
  obtenerVitrina(): Promise<IProductoVitrina[]>;
}
