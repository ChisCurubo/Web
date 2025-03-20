// interfaces/favoritoInterfaces.ts

import { IProductoFavorito } from "../../../../ModuloProductos/Domain/Producto/interfaces/productoIntefaces";


export interface FavoritoInterface {
  idFavorito: number;
  usuarioId: number;
  productos: IProductoFavorito[]; // Colección de items favoritos
}

export interface IFavoritoDetalle {
  usuarioId: number;
  productos: IProductoFavorito[]; // Array de productos en formato favorito
}