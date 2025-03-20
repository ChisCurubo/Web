// ModuloCarrito/application-Usecase/service/ProductoService.ts
import { IProductoDetalle, IProductoVitrina } from "../../Domain/Producto/interfaces/productoIntefaces";
import { IProductoRepository } from "../../Domain/Port/Driven/IProductoRepository";
import AbstractProducto from "../../Domain/Producto/AbstractProducto";
import ProductoServiceInterface from "../../Domain/interfaces/ProductoServiceInterface";

export default class ProductoService implements ProductoServiceInterface {
  constructor(private readonly productoRepository: IProductoRepository) {}

  async obtenerProductoPorId(id: number): Promise<IProductoDetalle> {
 
    return await this.productoRepository.findById(id);
  }

  
  async obtenerProductoPorNombre(nombre: string): Promise<AbstractProducto> {
   
    return await this.productoRepository.findByName(nombre);
  }




  async obtenerProductosPorRangoDePrecio(min: number, max: number): Promise<AbstractProducto[]> {
   
    return await this.productoRepository.findByPriceRange(min, max);
  }

  async buscarProductos(termino: string): Promise<AbstractProducto[]> {
   
    return await this.productoRepository.search(termino);
  }

  
  async obtenerVitrina(): Promise<IProductoVitrina[]> {
    return await this.productoRepository.getShowcase();
  }
}