import { IPagoQueries } from '../../Domain/IPagoQueries';
import { Pool } from "mysql2/promise";
import MySQLDatabase from "../Singelom/MySQLDatabase"; 

export class MySQLPagoQueries implements IPagoQueries {
  private readonly pool: Pool;

  constructor() {
    this.pool = MySQLDatabase.getPool(); 
  }

  async findByUsuarioId(usuarioId: number): Promise<any[]> {
    console.log(`Buscando pagos para usuario con ID: ${usuarioId}`); // ✅ Log para depurar
    
    const [rows]: any = await this.pool.execute(
          `SELECT * 
    FROM Pago p
    JOIN Carrito c ON p.carrito_id = c.idCarrito
    WHERE c.usuario_id = ?;
    `,
      [usuarioId]
    );

    console.log(`Resultado de pagos para usuario con ID ${usuarioId}:`, rows); // ✅ Log para ver el resultado
    return rows;
  }
  
  async insertPago(idUsuario: number): Promise<any> {
    console.log(`Insertando pago para usuario con ID: ${idUsuario}`); // ✅ Log para depurar
  
    if (!Number.isInteger(idUsuario)) {
      throw new Error(`idUsuario debe ser un número entero. Valor recibido: ${idUsuario}`);
    }
  
    // ✅ Ejecuta el procedimiento almacenado
    const [result]: any = await this.pool.execute(
      `CALL ProcesarPago(?)`,
      [idUsuario]
    );
  
    console.log(`Resultado de inserción para usuario con ID ${idUsuario}:`, result);
  
    // ✅ Si el procedimiento devuelve un mensaje, úsalo directamente
    const mensaje = result?.[0]?.[0]?.Resultado;
  
    if (mensaje) {
      return {
        mensaje, // ✅ Devuelve el mensaje directamente
      };
    }
  
    // ✅ Si no hay mensaje, verifica affectedRows como respaldo
    if (result?.[1]?.affectedRows > 0) {
      return {
        mensaje: "Pago procesado correctamente",
        pago: result[1]
      };
    }
  
    // ✅ Si no hay resultado, lanza un error controlado
    throw new Error("No se pudo procesar el pago.");
  }
  
}
