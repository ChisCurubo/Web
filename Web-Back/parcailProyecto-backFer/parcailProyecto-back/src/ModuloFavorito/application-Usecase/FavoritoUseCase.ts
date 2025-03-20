import { IItemFavoritoResumen } from "../Domain/ItemFavorito/interfaces/ItemFavoritoInterface";
import NullItemFavorito from "../Domain/ItemFavorito/NullItemFavorito";
import FavoritoUseCasePort from "../Domain/Port/Driver/FavoritoUseCasePort";
import FavoritoServiceInterface from "../Domain/interfaces/FavoritoServiceInterface"; // Usamos la interfaz

export default class FavoritoUseCase implements FavoritoUseCasePort {
  constructor(private readonly favoritoService: FavoritoServiceInterface) {}

  public async obtenerFavoritos(idUsuario: number): Promise<IItemFavoritoResumen[]> {
    const favoritos = await this.favoritoService.obtenerFavoritos(idUsuario);
    
    if (favoritos.length === 0) {
      return [new NullItemFavorito().toResumen()];
    }
    
    return favoritos;
  }

  public async agregarAFavoritos(usuarioID: number, productoID: number): Promise<void> {
    await this.favoritoService.agregarAFavoritos(usuarioID, productoID);
  }

  public async quitarProductoDeFavoritos(usuarioID: number, productoID: number): Promise<void> {
    await this.favoritoService.quitarProductoDeFavoritos(usuarioID, productoID);
  }

  public async contarFavoritos(usuarioID: number): Promise<{ idUsuario: number; cantidad: number }> {
    return await this.favoritoService.contarFavoritos(usuarioID);
  }
}