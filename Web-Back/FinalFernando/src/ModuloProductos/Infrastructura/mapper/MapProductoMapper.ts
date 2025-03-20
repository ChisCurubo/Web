import { ProductoInterface } from "../../Domain/Producto/interfaces/productoIntefaces";
import Producto from "../../Domain/Producto/Producto"

export default class MapProductoMapper {
  public static mapToProducto(productoData: ProductoInterface): Producto {
    return new Producto(productoData);
  }

  public static mapToProductos(productosData: ProductoInterface[]): Producto[] {
    return productosData.map(producto => new Producto(producto));
  }
}
