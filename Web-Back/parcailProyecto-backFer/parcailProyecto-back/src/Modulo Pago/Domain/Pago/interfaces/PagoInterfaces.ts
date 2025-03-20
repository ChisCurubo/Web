import AbstractCarrito from "../../../../ModuloCarrito/Domain/Carrito/AbstractCarrito";
import AbstractUsuario from "../../../../ModuloUsuario/Domain/Usuario/AbstractUsuario";

export interface PagoInterface {
  idPago: number;
  totalPago: string; 
  carrito: AbstractCarrito; 
  estadoPago: number;

  estadoCarrito: number; 
  usuario: AbstractUsuario; 
  totalCarrito: string; 
  horaCarrito: string; 
}

export interface IPagoInfo {
  idPago: number;
  totalPago: string; 

  estadoPago: number;

  estadoCarrito: number; 

  totalCarrito: string; 
  horaCarrito: string; 
}



export interface IRespuestaPago {
  mensaje: string;
  pago?: IPagoInfo; }
