import { IProductoFavorito } from "../../../../ModuloProductos/Domain/Producto/interfaces/productoIntefaces";
import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import AbstractFavorito from "../../Favorito/AbstractFavorito";

export interface IFavoritoRepository extends RepositoryInterface {
  findByUsuarioId(usuarioId: number): Promise<AbstractFavorito>;
  agregarProducto(usuarioId: number, productoId: number): Promise<void>;
  eliminarProducto(usuarioId: number, productoId: number): Promise<void>;
  obtenerProductos(usuarioId: number): Promise<IProductoFavorito[]>;
}
