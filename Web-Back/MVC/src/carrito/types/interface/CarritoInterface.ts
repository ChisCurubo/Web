import AbstractUsuario from "../../../usuario/types/AbstractTypes/AbstractUsuario";
import AbstractCarritoProducto from "../AbstractTypes/AbstractCarritoProducto";

export interface Carrito {
  idCarrito: number;
  carritoProducto: AbstractCarritoProducto;
  statusCarrito: boolean;
  totalCarrito: number;
  fechaCarrito: Date;
}