import { Connection } from "mysql2/promise";
import { IFavoritoRepository } from "../../Domain/Port/Driven/IFavoritoRepository";
import NullItemFavorito from "../../Domain/ItemFavorito/NullItemFavorito";
import { IItemFavoritoResumen, ItemFavoritoInterface } from "../../Domain/ItemFavorito/interfaces/ItemFavoritoInterface";
import ItemFavorito from "../../Domain/ItemFavorito/ItemFavorito";
import MapProductoMapper from "../../../ModuloProductos/Infrastructura/mapper/MapProductoMapper";

export class MySQLFavoritoRepository implements IFavoritoRepository {
  constructor(private readonly connection: Connection) {}

  public async obtenerProductos(usuarioID: number): Promise<IItemFavoritoResumen[]> {
    try {
      const [rows]: any = await this.connection.execute("CALL VerMisFavoritos(?)", [usuarioID]);

      console.log("Resultado crudo del procedimiento almacenado:", rows);

      const favoritos = Array.isArray(rows) && rows.length > 0 ? rows[0] : [];

      if (!favoritos || favoritos.length === 0) {
        console.log("No se encontraron productos favoritos.");
        return [new NullItemFavorito().toResumen()];
      }

      console.log("Favoritos procesados:", favoritos);

      return favoritos.map((favorito: any) => {
        console.log("Procesando favorito:", favorito);
       
        const itemFavoritoInterface: ItemFavoritoInterface = {
          idItemFavorito: favorito.idProducto, 
          producto: MapProductoMapper.mapToProducto(favorito), 
        };
        return new ItemFavorito(itemFavoritoInterface).toResumen();
      });
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      return [new NullItemFavorito().toResumen()];
    }
  }

  // Agregar un producto a la lista de favoritos de un usuario
  public async agregarProducto(usuarioID: number, productoID: number): Promise<void> {
    try {
      await this.connection.execute("CALL AgregarAFavoritosfinal(?, ?)", [usuarioID, productoID]);
    } catch (error) {
      console.error("Error al agregar producto a favoritos:", error);
      throw error;
    }
  }

  // Quitar un producto de la lista de favoritos de un usuario
  public async eliminarProducto(usuarioID: number, productoID: number): Promise<void> {
    try {
      await this.connection.execute("CALL QuitarDeFavoritosfinal(?, ?)", [usuarioID, productoID]);
    } catch (error) {
      console.error("Error al eliminar producto de favoritos:", error);
      throw error;
    }
  }

  // Contar la cantidad de productos en favoritos de un usuario
  public async contarProductos(usuarioID: number): Promise<number> {
    try {
      const [rows]: any = await this.connection.execute(
        `SELECT COUNT(f.producto_id) AS cantidad_productos_favoritos
         FROM Favoritos f
         WHERE f.usuario_id = ?`,
        [usuarioID]
      );
  
      // Verifica si hay resultados y devuelve la cantidad
      const cantidad = Array.isArray(rows) && rows.length > 0 ? rows[0].cantidad_productos_favoritos : 0;
      return cantidad;
    } catch (error) {
      console.error("Error al contar productos en favoritos:", error);
      throw error;
    }
  }
}