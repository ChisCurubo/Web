import { Pool } from "mysql2/promise";
import MySQLDatabase from "../Singelom/MySQLDatabase"; // Asegúrate de importar la clase de base de datos
import { IFavoritoQueries } from "../../Domain/IFavoritoQueries";


export class MySQLFavoritoQueries implements IFavoritoQueries {
  private readonly pool: Pool;

  constructor() {
    this.pool = MySQLDatabase.getPool();
  }
  async obtenerFavoritos(usuarioID: number): Promise<any[]> {
    const [rows]: any = await this.pool.execute("CALL VerMisFavoritos(?)", [usuarioID]);
    console.log('Resultado de la consulta VerMisFavoritos:', rows); // Agregar este log para ver el resultado
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : [];
}

  async agregarAFavoritos(usuarioID: number, productoID: number): Promise<void> {
    await this.pool.execute("CALL AgregarAFavoritosfinal(?, ?)", [usuarioID, productoID]);
  }

  async quitarDeFavoritos(usuarioID: number, productoID: number): Promise<void> {
    await this.pool.execute("CALL QuitarDeFavoritosfinal(?, ?)", [usuarioID, productoID]);
  }

  async contarFavoritos(usuarioID: number): Promise<number> {
    const [rows]: any = await this.pool.execute(
      `SELECT COUNT(f.producto_id) AS cantidad_productos_favoritos
       FROM Favoritos f
       WHERE f.usuario_id = ?`,
      [usuarioID]
    );
    return Array.isArray(rows) && rows.length > 0 ? rows[0].cantidad_productos_favoritos : 0;
  }
}