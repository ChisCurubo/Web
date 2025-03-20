import { ICarritoCompleto, ITotalesCarrito } from "../Carrito/interfaces/carritointerfaces";
import { IItemCarritoResumen } from "../iItemCarrito/Interfaces/ItemCarritoInterfaces";

export default interface CarritoServiceInterface {
  agregarProductoAlCarrito(usuarioId: number, productoId: number, cantidad: number): Promise<void>;
  verMiCarritoId(idUsuario: number): Promise<IItemCarritoResumen[]>;
  verMiCarritoCompleto(idUsuario: number): Promise<ICarritoCompleto>;
  calcularTotalesCarrito(idUsuario: number): Promise<ITotalesCarrito>;
  calcularTotalesCarritoCompleto(idUsuario: number): Promise<ITotalesCarrito>;
  eliminarProductoDelCarrito(usuarioId: number, productoId: number): Promise<void>;
  aumentarCantidadProducto(usuarioId: number, productoId: number): Promise<number>;
  disminuirCantidadProducto(usuarioId: number, productoId: number): Promise<number>;
}
