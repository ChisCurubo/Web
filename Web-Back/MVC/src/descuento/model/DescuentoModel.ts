import { Producto } from '../types/Producto';
import { ProductoOperaciones } from '../view/Interfaces/ProductoContract';
import Database from '../../shared/database/database';
import { Categoria } from '../types/Categoria';
import { Descuento } from '../types/Descuento';

export default class ProductoModel implements ProductoOperaciones {
  
  public async getTodosLosProductos(): Promise<Producto[]> {
    try {
      const query = 'SELECT * FROM BuenaVista_Productos WHERE estadoProducto = 1';
      const rows = await Database.executeQuery(query);
      return rows; // Devuelve todos los registros
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw new Error('No se pudieron obtener los productos');
    }
  }

  public async getProductoPorId(id: number): Promise<Producto | null> {
    const query = 'SELECT * FROM BuenaVista_Productos WHERE idProducto = ? AND estadoProducto = 1';
    const rows = await Database.executeQuery(query, [id]);
    return rows[0] || null;
  }

  public async buscarProductosPorNombre(nombre: string): Promise<Producto[]> {
    const query = 'SELECT * FROM BuenaVista_Productos WHERE nombreProducto LIKE ? AND estadoProducto = 1';
    const rows = await Database.executeQuery(query, [`%${nombre}%`]);
    return rows;
  }

  public async buscarProductosPorCategoria(categoriaId: number): Promise<Producto[]> {
    const query = 'SELECT * FROM BuenaVista_Productos WHERE categoria_id = ? AND estadoProducto = 1';
    const rows = await Database.executeQuery(query, [categoriaId]);
    return rows;
  }

  public async buscarProductosPorMarca(marca: string): Promise<Producto[]> {
    const query = 'SELECT * FROM BuenaVista_Productos WHERE marcaProducto = ? AND estadoProducto = 1';
    const rows = await Database.executeQuery(query, [marca]);
    return rows;
  }

  public async crearProducto(producto: Producto): Promise<void> {
    const query = `
      INSERT INTO BuenaVista_Productos 
      (nombreProducto, descripcionProducto, precioProducto, stockProducto, marcaProducto, categoria_id, estadoProducto) 
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `;
    await Database.executeQuery(query, [
      producto.getNombreProducto(),
      producto.getDescripcionProducto,
      producto.getPrecioProducto(),
      producto.getStockProducto(),
      producto.getMarcaProducto(),
      producto.getCategoria(),
    ]);
  }

  public async actualizarProducto(id: number, producto: Partial<Producto>): Promise<void> {
    const fields = Object.keys(producto).map(key => `${key} = ?`).join(', ');
    const values = Object.values(producto);
    const query = `UPDATE BuenaVista_Productos SET ${fields} WHERE idProducto = ? AND estadoProducto = 1`;
    await Database.executeQuery(query, [...values, id]);
  }

  public async borrarProducto(id: number): Promise<void> {
    const query = 'UPDATE BuenaVista_Productos SET estadoProducto = 0 WHERE idProducto = ?';
    await Database.executeQuery(query, [id]);
  }

  public async verCategoriaDelProducto(idProducto: number): Promise<Categoria | null> {
    const query = `
      SELECT c.* 
      FROM BuenaVista_Productos p 
      INNER JOIN BuenaVista_Categorias c ON p.categoria_id = c.idCategoria 
      WHERE p.idProducto = ? AND p.estadoProducto = 1
    `;
    const rows = await Database.executeQuery(query, [idProducto]);
    return rows[0] || null;
  }

  public async calcularPrecioConDescuento(idProducto: number): Promise<number> {
    const query = `
      SELECT p.precioProducto, d.descuentoPorcentaje 
      FROM BuenaVista_Productos p 
      LEFT JOIN BuenaVista_Descuentos d ON p.descuento_id = d.idDescuento 
      WHERE p.idProducto = ? AND p.estadoProducto = 1
    `;
    const rows = await Database.executeQuery(query, [idProducto]);
    const producto = rows[0];
    if (!producto) throw new Error('Producto no encontrado.');
    const descuento = producto.descuentoPorcentaje || 0;
    return producto.precioProducto * (1 - descuento / 100);
  }

  public async verificarDisponibilidad(idProducto: number): Promise<boolean> {
    const query = 'SELECT stockProducto FROM BuenaVista_Productos WHERE idProducto = ? AND estadoProducto = 1';
    const rows = await Database.executeQuery(query, [idProducto]);
    const producto = rows[0];
    return producto ? producto.stockProducto > 0 : false;
  }

  public async verDescuentoDelProducto(idProducto: number): Promise<Descuento | null> {
    const query = `
      SELECT d.* 
      FROM BuenaVista_Productos p 
      INNER JOIN BuenaVista_Descuentos d ON p.descuento_id = d.idDescuento 
      WHERE p.idProducto = ? AND p.estadoProducto = 1
    `;
    const rows = await Database.executeQuery(query, [idProducto]);
    return rows[0] || null;
  }
}
