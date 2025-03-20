import { IProductoFavorito } from "../../../../ModuloProductos/Domain/Producto/interfaces/productoIntefaces";

export default interface FavoritoUseCasePort {

  obtenerFavoritos(idUsuario: number): Promise<IProductoFavorito[]>;
  agregarAFavoritos(usuarioID: number, productoID: number): Promise<void>;
  quitarProductoDeFavoritos(usuarioID: number, productoID: number): Promise<void>;
}
