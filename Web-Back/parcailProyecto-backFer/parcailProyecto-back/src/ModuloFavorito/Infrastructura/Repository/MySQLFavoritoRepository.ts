import NullItemFavorito from "../../Domain/ItemFavorito/NullItemFavorito";
import { IFavoritoRepository } from "../../Domain/Port/Driven/IFavoritoRepository";
import { IItemFavoritoResumen } from "../../Domain/ItemFavorito/interfaces/ItemFavoritoInterface";

import { IFavoritoQueries } from "../../../Mysql/Domain/IFavoritoQueries";
import { IFavoritos } from "../../Domain/Favorito/interfaces/FavoritoInterface";


// interfaces/FavoritoInterface.ts

export class MySQLFavoritoRepository implements IFavoritoRepository {
  constructor(private readonly queries: IFavoritoQueries) {}

  public async obtenerProductos(usuarioID: number): Promise<IItemFavoritoResumen[]> {
    try {
      const favoritos: IFavoritos[] = await this.queries.obtenerFavoritos(usuarioID);
  
      if (!favoritos || favoritos.length === 0) {
        return [new NullItemFavorito().toResumen()];
      }
  
      return favoritos.map((favorito: IFavoritos) => {
        const itemFavoritoResumen: IItemFavoritoResumen = {
          idProducto: favorito.idProducto,
          nombreProducto: favorito.nombreProducto,
          tallaProducto: favorito.tallaProducto || '',
          precioProducto: favorito.precioProducto.toString(),
          stockProducto: favorito.stockProducto || 0,
          imgProducto: favorito.imgProducto || null,
          nombreCategoria: favorito.nombreCategoria || '',
        };
  
        return itemFavoritoResumen;
      });
    } catch (error) {
     
      return [new NullItemFavorito().toResumen()];
    }

  }
  public async agregarProducto(usuarioID: number, productoID: number): Promise<void> {
    try {
      await this.queries.agregarAFavoritos(usuarioID, productoID);
    } catch (error) {
      console.error("Error al agregar producto a favoritos:", error);throw error;
    }
  }

  public async eliminarProducto(usuarioID: number, productoID: number): Promise<void> {
    try {
      await this.queries.quitarDeFavoritos(usuarioID, productoID);
    } catch (error) {
      console.error("Error al eliminar producto de favoritos:", error);
      throw error;
    }
  }

  public async contarProductos(usuarioID: number): Promise<number> {
    try {
      return await this.queries.contarFavoritos(usuarioID);
    } catch (error) {
      console.error("Error al contar productos en favoritos:", error);
      throw error;
    }
  }
}