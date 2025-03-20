import { IItemCarritoCompleto } from "../../iItemCarrito/Interfaces/ItemCarritoInterfaces";


// Interfaces para Carrito
export interface ICarritoCompleto {
  productos: IItemCarritoCompleto[];
}

export interface ITotalesCarrito {
  Subtotal: string;
  CantidadTotalArticulos: number;
  TotalConIVA: string;
  MensajeEnvio: string;
}

// Interfaz principal para construcción de Carrito
export interface CarritoInterface {
  idCarrito: number;
  usuarioId: number;
  items: any[]; // se usara any pero en la implementación usaremos el tipo correcto por si acaso para que no me llame any any 
}