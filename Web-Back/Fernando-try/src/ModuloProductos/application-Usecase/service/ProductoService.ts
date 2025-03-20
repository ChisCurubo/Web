// ModuloCarrito/application-Usecase/service/ProductoService.ts
import { IProductoDetalle } from "../../Domain/Producto/interfaces/productoIntefaces";
import { IProductoRepository } from "../../Domain/Port/Driven/IProductoRepository";
import AbstractProducto from "../../Domain/Producto/AbstractProducto";
import ProductoServiceInterface from "../../Domain/interfaces/ProductoServiceInterface";

export default class ProductoService implements ProductoServiceInterface {
  constructor(private readonly productoRepository: IProductoRepository) {}

  async obtenerProductoPorId(id: number): Promise<IProductoDetalle> {
    if (!id || id <= 0) {
      throw new Error("El ID del producto no es válido.");
    }
    return await this.productoRepository.findById(id);
  }

  // Método renombrado para coincidir con la interfaz
  async obtenerProductoPorNombre(nombre: string): Promise<AbstractProducto> {
    if (!nombre || nombre.trim() === "") {
      throw new Error("El nombre del producto no puede estar vacío.");
    }
    return await this.productoRepository.findByName(nombre);
  }



  // Método renombrado para coincidir con la interfaz
  async obtenerProductosPorRangoDePrecio(min: number, max: number): Promise<AbstractProducto[]> {
    if (min < 0 || max < 0 || min > max) {
      throw new Error("Rango de precios inválido.");
    }
    return await this.productoRepository.findByPriceRange(min, max);
  }

  async buscarProductos(termino: string): Promise<AbstractProducto[]> {
    if (!termino || termino.trim() === "") {
      throw new Error("El término de búsqueda no puede estar vacío.");
    }
    return await this.productoRepository.search(termino);
  }

  // Método renombrado para coincidir con la interfaz
  async obtenerVitrina(): Promise<AbstractProducto[]> {
    return await this.productoRepository.getShowcase();
  }
}