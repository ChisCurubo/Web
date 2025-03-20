// ItemCarritoInterfaces.ts


// Interfaces para ItemCarrito
export interface IItemCarritoResumen {
    idProducto: number;
    nombreProducto: string;
    tallaProducto: string;
    precioProducto: string;
    cantidad: number;
    subtotal: string;
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