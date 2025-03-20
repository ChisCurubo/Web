import { Pool } from "mysql2/promise";
import MySQLDatabase from "../Singelom/MySQLDatabase"; // Asegúrate de importar la clase de base de datos
import { IProductoQueries } from "../../Domain/IProductoQueries";
import IProductoData from "../../../ModuloProductos/Domain/interfaces/IProductoData";

export class MySQLProductoQueries implements IProductoQueries {
  private readonly pool: Pool;

  constructor() {
    this.pool = MySQLDatabase.getPool();
  }

  async findByPriceRange(min: number, max: number): Promise<any[]> {
    const [result]: any = await this.pool.query(
      "CALL FiltrarProductosPorPrecio(?, ?)", 
      [min, max]
    );
    return Array.isArray(result) && result.length > 0 && Array.isArray(result[0]) ? result[0] : [];
  }

  async findById(id: number): Promise<any[]> {
    const [rows] = await this.pool.execute<any[]>(
      `SELECT 
          p.idProducto,
          p.nombreProducto,
          p.descripcionProducto,
          p.precioProducto,
          p.imgProducto,
          p.stockProducto,
          CASE 
              WHEN p.descuento_id IS NOT NULL THEN 'Tiene promoción'
              ELSE 'No tiene promoción'
          END AS promocion
      FROM Productos p
      LEFT JOIN Descuentos d ON p.descuento_id = d.idDescuento
      WHERE p.idProducto = ?;`,
      [id]
    );
    return rows;
  }

  async findByName(nombre: string): Promise<any[]> {
    const [rows]: any = await this.pool.execute(
      "SELECT * FROM Productos WHERE nombreProducto = ? LIMIT 1",
      [nombre]
    );
    return rows;
  }

  async search(termino: string): Promise<any[]> {
    const [rows]: any = await this.pool.execute("CALL BuscarProductosFinal1(?)", [termino]);
    return rows[0];
  }

  async getShowcase(): Promise<IProductoData[]> {
    const [rows]: any = await this.pool.execute(
      `SELECT p.idProducto, p.nombreProducto, p.tallaProducto, p.precioProducto,
              p.stockProducto, p.imgProducto AS imagenProducto, c.nombreCategoria AS categoriaNombre,
              CASE WHEN p.descuento_id IS NOT NULL THEN 'Sí' ELSE 'No' END AS enPromocion
       FROM Productos p
       LEFT JOIN Categoria c ON p.categoria_id = c.idCategoria
       WHERE p.estadoProducto = TRUE
       ORDER BY p.nombreProducto ASC;`
    );
 
  
    return rows; // Asegúrate de que esto devuelva un array
  }
}