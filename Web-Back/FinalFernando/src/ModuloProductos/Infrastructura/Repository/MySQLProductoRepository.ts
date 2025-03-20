// MySQLProductoRepository.ts
import NullProducto from "../../Domain/Producto/NullProducto";
import { IProductoRepository } from "../../Domain/Port/Driven/IProductoRepository";
import AbstractProducto from "../../Domain/Producto/AbstractProducto";
import Producto from "../../Domain/Producto/Producto";
import { IProductoDetalle, IProductoVitrina } from "../../Domain/Producto/interfaces/productoIntefaces";
import IProductoData from "../../Domain/interfaces/IProductoData";
import { IProductoQueries } from "../../../Mysql/Domain/IProductoQueries";


export class MySQLProductoRepository implements IProductoRepository {
  constructor(private readonly queries: IProductoQueries) {} 

  async findByPriceRange(min: number, max: number): Promise<AbstractProducto[]> {
    try {
      const rows = await this.queries.findByPriceRange(min, max);
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

  async findById(id: number): Promise<IProductoDetalle> {
    try {
      const rows = await this.queries.findById(id);
      if (rows.length === 0) {
        return new NullProducto().toDetalle();
      }
      return new Producto(rows[0]).toDetalle();
    } catch (error) {
      console.error("Error al buscar producto por ID:", error);
      return new NullProducto().toDetalle();
    }
  }

  async findByName(nombre: string): Promise<AbstractProducto> {
    try {
      const rows = await this.queries.findByName(nombre);
      if (rows.length === 0) {
        return new NullProducto();
      }
      return new Producto(rows[0]);
    } catch (error) {
      console.error("Error al buscar producto por nombre:", error);
      return new NullProducto();
    }
  }

  async search(termino: string): Promise<AbstractProducto[]> {
    try {
      const rows = await this.queries.search(termino);
      return rows.map((producto: any) => new Producto(producto));
    } catch (error) {
      console.error("Error al buscar productos por término:", error);
      return [new NullProducto()];
    }
  }

  async getShowcase(): Promise<IProductoVitrina[]> {
    try {
      const result: any = await this.queries.getShowcase();
      const rows: IProductoData[] = result;

      // Verifica si rows es un array
      if (!Array.isArray(rows)) {
        throw new Error("El resultado no es un array");
      }

      return rows.map((producto: IProductoData) =>
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
      return [new NullProducto().toVitrina()];
    }
  }
}