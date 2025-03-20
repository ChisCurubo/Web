
// Interfaces para diferentes vistas del producto
export interface IProductoVitrina {
    idProducto: number;
    nombreProducto: string;
    tallaProducto: string;
    precioProducto: string;
    stockProducto: number;
    imgProducto: string | null;
    nombreCategoria: string;
    enPromocion?: string;
  }
  
  export interface IProductoDetalle {
   
    idProducto: number;
    nombreProducto: string;
    descripcionProducto: string;
    precioProducto: string;
    imgProducto: string;
    stockProducto: number;
    promocion: string;
  }
  
  export interface IProductoFavorito {
    idProducto: number;
    nombreProducto: string;
    tallaProducto: string;
    precioProducto: string;
    stockProducto: number;
    imgProducto: string | null;
    nombreCategoria: string;
    
  }
 
  // Interfaz principal para construcción de productos
  export interface ProductoInterface {
    idProducto: number;
    nombreProducto: string;
    descripcionProducto: string;
    precioProducto: number;
    stockProducto: number;
    imagenProducto: string | null;
    categoriaId: number;
   
    enPromocion: boolean;
    categoriaNombre: string;
    marcaNombre: string;
    tallaNombre: string;
  }

