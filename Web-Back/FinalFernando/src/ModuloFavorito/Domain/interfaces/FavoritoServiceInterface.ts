import { IItemFavoritoResumen } from "../ItemFavorito/interfaces/ItemFavoritoInterface";

export default interface FavoritoServiceInterface {
    obtenerFavoritos(idUsuario: number): Promise<IItemFavoritoResumen[]>;
    agregarAFavoritos(usuarioId: number, productoId: number): Promise<void>;
    quitarProductoDeFavoritos(usuarioId: number, productoId: number): Promise<void>;
    contarFavoritos(usuarioId: number): Promise<{ idUsuario: number; cantidad: number }>; 
}