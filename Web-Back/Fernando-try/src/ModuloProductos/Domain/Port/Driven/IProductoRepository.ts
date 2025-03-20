import AbstractProducto from "../../Producto/AbstractProducto";
import { IProductoDetalle } from "../../Producto/interfaces/productoIntefaces";

export interface IProductoRepository {
  
  findById(id: number): Promise<IProductoDetalle>;
  findByName(nombre: string): Promise<AbstractProducto>;
 
  findByPriceRange(min: number, max: number): Promise<AbstractProducto[]>;
  search(termino: string): Promise<AbstractProducto[]>;
  getShowcase(): Promise<AbstractProducto[]>;
   
}





