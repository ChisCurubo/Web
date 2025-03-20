import {IItemFavoritoResumen } from "../../ItemFavorito/interfaces/ItemFavoritoInterface";

export default interface FavoritoUseCasePort {
  
  obtenerFavoritos(idUsuario: number): Promise<IItemFavoritoResumen[]>;
  
  agregarAFavoritos(usuarioID: number, productoID: number): Promise<void>;
  
  quitarProductoDeFavoritos(usuarioID: number, productoID: number): Promise<void>;

  contarFavoritos(usuarioID: number): Promise<{ idUsuario: number; cantidad: number }>;
}