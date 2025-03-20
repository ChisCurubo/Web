


// Vista Resumen de Favoritos
export interface IFavoritoResumen {
  idFavorito: number;
  idUsuario: number; 
  totalItems: number;
  productos: any[]; 
}



// Vista Completa de Favoritos
export interface IFavorito {
  idFavorito: number;
  idUsuario: number;  
  itemsFavoritos: any[]; 
}

export interface IFavoritos {
  idProducto: number;
  nombreProducto: string;
  tallaProducto: string;
  precioProducto: string; 
  stockProducto: number;
  imgProducto: string | null;
  nombreCategoria: string;
  idItemFavorito: number; 
}
























































export interface FavoritoInterface {
  idFavorito: number;
  idUsuario: number;
  itemsFavoritos: any [] ;
}