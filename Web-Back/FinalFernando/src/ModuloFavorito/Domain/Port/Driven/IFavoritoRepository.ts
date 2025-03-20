
import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import { IItemFavoritoResumen } from "../../ItemFavorito/interfaces/ItemFavoritoInterface";

export interface IFavoritoRepository extends RepositoryInterface {
  
  agregarProducto(usuarioId: number, productoId: number): Promise<void>;
  
  eliminarProducto(usuarioId: number, productoId: number): Promise<void>;
  
  obtenerProductos(usuarioId: number): Promise<IItemFavoritoResumen[]>;

  contarProductos(usuarioId: number): Promise<number>; 
}