import { Connection } from "mysql2/promise";
import NullProducto from "../../Domain/Producto/NullProducto"
import { IProductoRepository } from "../../Domain/Port/Driven/IProductoRepository";
import AbstractProducto from "../../Domain/Producto/AbstractProducto";
import Producto from "../../Domain/Producto/Producto"
import { IProductoDetalle } from "../../Domain/Producto/interfaces/productoIntefaces";



export class MySQLProductoRepository implements IProductoRepository {
  constructor(private readonly connection: Connection) {}



// Buscar productos por rango de precios



// Buscar productos por rango de precios
async findByPriceRange(min: number, max: number): Promise<AbstractProducto[]> {
  try {
    const [result]: any = await this.connection.query(
      "CALL FiltrarProductosPorPrecio(?, ?)", 
      [min, max]
    );

   

    // Verificar si el resultado es un array anidado
    const rows = Array.isArray(result) && result.length > 0 && Array.isArray(result[0]) ? result[0] : [];

   

   
    if (rows.length === 0) {
      console.log("No hay productos, devolviendo NullProducto.");
      return [new NullProducto()];
    }

   
    return rows.map((producto: any) => new Producto(producto));

  } catch (error) {
    console.error("Error al buscar productos por rango de precios:", error);
    return [new NullProducto()];
  }
}

  // Buscar producto por ID
  async findById(id: number): Promise<IProductoDetalle> {
    try {
        const [rows] = await this.connection.execute<any[]>(
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

        if (rows.length === 0) {
            return new  NullProducto().toDetalle();
        }

        return new Producto(rows[0]).toDetalle();
    } catch (error) {
      return new  NullProducto().toDetalle();
        throw error;
    }
}


 // Buscar producto por nombre
async findByName(nombre: string): Promise<AbstractProducto> {
  try {
    const [rows]: any = await this.connection.execute(
      "SELECT * FROM Productos WHERE nombreProducto = ? LIMIT 1",
      [nombre]
    );

    if (rows.length === 0) {
      return new NullProducto();
    }

    return new Producto(rows[0]);
  } catch (error) {
    console.error("Error al buscar producto por nombre:", error);
    return new NullProducto();
  }
}








  // Buscar productos por término de búsqueda
// Buscar productos por término de búsqueda
async search(termino: string): Promise<AbstractProducto[]> {
  try {
    const [rows]: any = await this.connection.execute("CALL BuscarProductosFinal1(?)", [termino]);

    return rows[0].map((producto: any) => new Producto(producto));
  } catch (error) {
    console.error("Error al buscar productos por término:", error);
    return [new NullProducto()];
  }
}

  async getShowcase(): Promise<AbstractProducto[]> {
    try {
      const [rows]: any = await this.connection.execute(
        `SELECT p.idProducto, p.nombreProducto, p.tallaProducto, p.precioProducto,
                p.stockProducto, p.imgProducto AS imagenProducto, c.nombreCategoria AS categoriaNombre,
                CASE WHEN p.descuento_id IS NOT NULL THEN 'Sí' ELSE 'No' END AS enPromocion
         FROM Productos p
         LEFT JOIN Categoria c ON p.categoria_id = c.idCategoria
         WHERE p.estadoProducto = TRUE
         ORDER BY p.nombreProducto ASC;`
      );
  
      return rows.map((producto: any) =>
        new Producto({
          idProducto: producto.idProducto,
          nombreProducto: producto.nombreProducto,
          descripcionProducto: producto.descripcionProducto,
          precioProducto: producto.precioProducto,
          stockProducto: producto.stockProducto,
          imagenProducto: producto.imagenProducto,
          categoriaId: producto.categoriaId,
          enPromocion: producto.enPromocion === 'Sí',
          categoriaNombre: producto.categoriaNombre,
          marcaNombre: producto.marcaNombre,
          tallaNombre: producto.tallaNombre,
        }).toVitrina()
      );
    } catch (error) {
      console.error("Error al obtener productos destacados:", error);
      return [new NullProducto()];
    }
  }
}
