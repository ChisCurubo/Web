import AbstractProducto from "../../../../ModuloProductos/Domain/Producto/AbstractProducto";


export interface ItemFavoritoInterface {
  idItemFavorito: number;
  producto: AbstractProducto;
}

// Vista Resumen de un Item Favorito
export interface IItemFavoritoResumen {
  idProducto: number;
  nombreProducto: string;
  tallaProducto: string;
  precioProducto : string ;
  stockProducto: number;
  imgProducto: string | null;
  nombreCategoria: string;
}



// Vista Completa de un Item Favorito
export interface IItemFavoritoCompleto {
  idProducto: number;
  Producto: string;
  Talla: string;
  Marca: string;
  PrecioUnitario: string;
}
