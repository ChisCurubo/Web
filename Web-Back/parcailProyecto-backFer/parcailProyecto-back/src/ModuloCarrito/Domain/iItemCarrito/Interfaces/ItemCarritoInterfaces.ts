// ItemCarritoInterfaces.ts


// Interfaces para ItemCarrito
export interface IItemCarritoResumen {
  idProducto: number;
  nombreProducto: string;
  tallaProducto: string;
  precioProducto: string; // Asegúrate de que sea un string
  stockProducto: number;
  imgProducto: string | null;
 
}
  


  export interface IItemCarritoCompleto {
    idProducto: number;
    Producto: string;
    Talla: string;
    Marca: string;
    Cantidad: number;
    PrecioUnitario: string;
    Subtotal: string;
  }
  

  export interface ItemCarritoInterface {
    idItemCarrito: number;
    usuarioId: number;
    producto: any; 
    cantidad: number;
  }