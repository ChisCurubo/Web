import NullItemFavorito from "../../Domain/ItemFavorito/NullItemFavorito";
import { IFavoritoRepository } from "../../Domain/Port/Driven/IFavoritoRepository";
import { IItemFavoritoResumen } from "../../Domain/ItemFavorito/interfaces/ItemFavoritoInterface";

import { IFavoritoQueries } from "../../../Mysql/Domain/IFavoritoQueries";


export class MySQLFavoritoRepository implements IFavoritoRepository {
  constructor(private readonly queries: IFavoritoQueries) {}

  public async obtenerProductos(usuarioID: number): Promise<IItemFavoritoResumen[]> {
    try {
      const favoritos = await this.queries.obtenerFavoritos(usuarioID);
  
      console.log("Favoritos obtenidos:", favoritos);
  
      if (!favoritos || favoritos.length === 0) {
        console.log("No se encontraron productos favoritos.");
        return [new NullItemFavorito().toResumen()]; // Asegúrate de que NullItemFavorito.toResumen() devuelva un objeto que cumpla con IItemFavoritoResumen
      }
  
      console.log("Favoritos procesados:", favoritos);
  
      return favoritos.map((favorito: any) => {
        console.log("Procesando favorito:", favorito);
        
        // Asegúrate de que el objeto favorito tenga las propiedades necesarias
        const itemFavoritoResumen: IItemFavoritoResumen = {
          idProducto: favorito.idProducto, // Asegúrate de que esta propiedad exista
          nombreProducto: favorito.nombreProducto, // Asegúrate de que esta propiedad exista
          tallaProducto: favorito.tallaProducto || '', // Proporciona un valor por defecto si es necesario
          precioProducto: favorito.precioProducto.toString(), // Convierte a string si es necesario
          stockProducto: favorito.stockProducto || 0, // Proporciona un valor por defecto si es necesario
          imgProducto: favorito.imgProducto || null, // Proporciona null si no hay imagen
          nombreCategoria: favorito.nombreCategoria || '', // Proporciona un valor por defecto si es necesario
        };
  
        return itemFavoritoResumen;
      });
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      return [new NullItemFavorito().toResumen()]; // Asegúrate de que esto devuelva un objeto que cumpla con IItemFavoritoResumen
    }
  }
  public async agregarProducto(usuarioID: number, productoID: number): Promise<void> {
    try {
      await this.queries.agregarAFavoritos(usuarioID, productoID);
    } catch (error) {
      console.error("Error al agregar producto a favoritos:", error);
      throw error;
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