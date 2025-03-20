import { IItemFavoritoResumen } from "../../Domain/ItemFavorito/interfaces/ItemFavoritoInterface";
import { IFavoritoRepository } from "../../Domain/Port/Driven/IFavoritoRepository";
import FavoritoServiceInterface from "../../Domain/interfaces/FavoritoServiceInterface";

export default class FavoritoService implements FavoritoServiceInterface {
  constructor(private readonly favoritoRepository: IFavoritoRepository) {}

  async obtenerFavoritos(idUsuario: number): Promise<IItemFavoritoResumen[]> {
    if (!idUsuario || idUsuario <= 0) {
      throw new Error("El ID del usuario no es válido.");
    }
    return await this.favoritoRepository.obtenerProductos(idUsuario);
  }

  async agregarAFavoritos(usuarioID: number, productoID: number): Promise<void> {
    if (!usuarioID || usuarioID <= 0 || !productoID || productoID <= 0) {
      throw new Error("ID de usuario o producto no válido.");
    }
    await this.favoritoRepository.agregarProducto(usuarioID, productoID);
  }

  async quitarProductoDeFavoritos(usuarioID: number, productoID: number): Promise<void> {
    if (!usuarioID || usuarioID <= 0 || !productoID || productoID <= 0) {
      throw new Error("ID de usuario o producto no válido.");
    }
    await this.favoritoRepository.eliminarProducto(usuarioID, productoID);
  }

  async contarFavoritos(usuarioID: number): Promise<{ idUsuario: number; cantidad: number }> {
    if (!usuarioID || usuarioID <= 0) {
      throw new Error("El ID del usuario no es válido.");
    }
    const cantidad = await this.favoritoRepository.contarProductos(usuarioID);
    return {
      idUsuario: usuarioID,
      cantidad: cantidad,
    };
  }
}