import { IProductoFavorito } from "../../../ModuloProductos/Domain/Producto/interfaces/productoIntefaces";

export default interface FavoritoServiceInterface {
    obtenerFavoritos(idUsuario: number): Promise<IProductoFavorito[]>;
    agregarAFavoritos(usuarioId: number, productoId: number): Promise<void>;
    quitarProductoDeFavoritos(usuarioId: number, productoId: number): Promise<void>;
}
