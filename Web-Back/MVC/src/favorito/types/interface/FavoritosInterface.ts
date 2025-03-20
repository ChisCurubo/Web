import AbstractProducto from "../../../producto/types/AbstractTypes/AbstractProducto";
import AbstractUsuario from "../../../usuario/types/AbstractTypes/AbstractUsuario";


export interface Favoritos {
  idFavoritos: number;
  idUsuario: AbstractUsuario;
  idProducto: AbstractProducto[];
  statusFavorito: boolean;
}
