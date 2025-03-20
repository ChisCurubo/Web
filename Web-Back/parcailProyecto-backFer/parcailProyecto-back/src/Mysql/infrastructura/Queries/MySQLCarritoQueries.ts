import { Pool } from "mysql2/promise";
import MySQLDatabase from "../Singelom/MySQLDatabase"; // Asegúrate de importar la clase de base de datos
import { ICarritoQueries } from "../../Domain/ICarritoQueries";
import { RepositorioError } from "../../../ModuloCarrito/Domain/error/CarritoError";

export class MySQLCarritoQueries implements ICarritoQueries {
  private readonly pool: Pool;

  constructor() {
    this.pool = MySQLDatabase.getPool(); 
  }

  async executeStoredProcedure(procedure: string, params: any[]): Promise<any> {
    try {
      const [result]: any = await this.pool.execute(procedure, params);
      return Array.isArray(result) ? result[0] : result;
    } catch {
      throw new RepositorioError(`Error al ejecutar el procedimiento: ${procedure}`);
    }
  }

  async calcularTotalesCarrito(idUsuario: number): Promise<any> {
    const rows = await this.executeStoredProcedure(
      'CALL CalcularTotalesCarrito(?);',
      [idUsuario]
    );
    return rows; 
  }

  async verMiCarrito(usuarioId: number): Promise<any[]> {
    const rows = await this.executeStoredProcedure(
      'CALL VerMiCarrito(?);',
      [usuarioId]
    );
    return rows; 
  }

  async agregarProductoAlCarrito(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    await this.executeStoredProcedure(
      'CALL AgregarProductoAlCarrito(?, ?, ?);',
      [usuarioId, productoId, cantidad]
    );
  }

  async eliminarProductoDelCarrito(usuarioId: number, productoId: number): Promise<void> {
    await this.executeStoredProcedure(
      'CALL EliminarProductoDelCarrito(?, ?);',
      [usuarioId, productoId]
    );
  }

  async aumentarCantidadProducto(usuarioId: number, productoId: number): Promise<number> {
    const [rows]: any = await this.pool.execute(
        'SELECT AumentarCantidadProductoCarrito(?, ?) AS cantidad;',
        [usuarioId, productoId]
    );

    // Verifica que rows sea un array
    if (!Array.isArray(rows) || rows.length === 0) {
        throw new Error("No se encontraron resultados para aumentar la cantidad.");
    }

    return rows[0].cantidad;
}
async disminuirCantidadProducto(usuarioId: number, productoId: number): Promise<number> {
  const [rows]: any = await this.pool.execute(
      'SELECT DisminuirCantidadProductoCarrito(?, ?) AS cantidad;',
      [usuarioId, productoId]
  );

  console.log("rows:", rows); // Verifica el contenido de rows

  // Verifica que rows sea un array y que tenga al menos un elemento
  if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error("No se encontraron resultados para disminuir la cantidad.");
  }

  return rows[0].cantidad; // Asegúrate de que esto sea un número
}
  async verCarritoCompleto(usuarioId: number): Promise<any> {
    const rows = await this.executeStoredProcedure(
      'CALL VerMiCarritoCompleto(?);',
      [usuarioId]
    );
    return rows; 
  }

  async obtenerIdCarrito(usuarioId: number): Promise<number> {
    const [carritoRows] = await this.pool.execute(
      'SELECT idCarrito FROM Carrito WHERE usuario_id = ?',
      [usuarioId]
    ) as [any[], any]; // Asegúrate de que el tipo sea correcto
  
    if (carritoRows.length === 0) {
      throw new RepositorioError(`No se encontró carrito para el usuario: ${usuarioId}`);
    }
  
    return carritoRows[0].idCarrito; // Cambiado a [0] para acceder al primer elemento
  }
  
  async crearNuevoCarrito(usuarioId: number): Promise<void> {
    await this.pool.execute(
      'INSERT INTO Carrito (usuario_id, totalCarrito) VALUES (?, 0)',
      [usuarioId]
    );
  }

  async verProductosEnCarrito(carritoId: number): Promise<any[]> {
    const [rows]: any = await this.pool.execute(
      `SELECT cp.idCarrito, cp.idProducto, cp.cantidad, 
              p.nombreProducto, p.descripcionProducto, p.precioProducto, 
              p.stockProducto, p.imgProducto, p.categoria_id, p.marcaProducto,
              c.nombreCategoria
       FROM Carrito_Productos cp
       JOIN Productos p ON cp.idProducto = p.idProducto
       LEFT JOIN Categoria c ON p.categoria_id = c.idCategoria
       WHERE cp.idCarrito = ?`,
      [carritoId]
    );

    
    
    console.log("rows:", rows);
    return rows; 
  }

  // Nuevo método para calcular totales del carrito completo
  async calcularTotalesCarritoCompleto(idUsuario: number): Promise<any> {
    const rows = await this.executeStoredProcedure(
      'CALL CalcularTotalesCarritoCompleto(?);',
      [idUsuario]
    );
    return rows; 
  }
}