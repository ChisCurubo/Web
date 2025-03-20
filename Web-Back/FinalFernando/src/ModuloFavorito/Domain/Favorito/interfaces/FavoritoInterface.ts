


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


























































export interface FavoritoInterface {
  idFavorito: number;
  idUsuario: number;
  itemsFavoritos: any [] ;
}