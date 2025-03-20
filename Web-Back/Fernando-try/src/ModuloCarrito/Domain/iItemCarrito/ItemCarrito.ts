import AbstractItemCarrito from "./AbstractItemCarrito";
import { ItemCarritoInterface } from "./Interfaces/ItemCarritoInterfaces";

export default class ItemCarrito extends AbstractItemCarrito {
  constructor(itemCarritoInterface: ItemCarritoInterface) {
    super(itemCarritoInterface);
  }

  public isNull(): boolean {
    return false;
  }

  public override toString(): string {
    return `ItemCarrito: { 
      idItemCarrito: ${this.getId()}, 
      usuarioId: ${this.getUsuarioId()}, 
      producto: "${this.getProducto().getNombre()}", 
      cantidad: ${this.getCantidad()}, 
      subtotal: $${this.getSubtotal().toFixed(2)}
    }`;
  }

  // Método adicional para incrementar la cantidad
  public incrementarCantidad(cantidad: number = 1): void {
    if (cantidad > 0) {
      this.setCantidad(this.getCantidad() + cantidad);
    }
  }

  // Método adicional para decrementar la cantidad
  public decrementarCantidad(cantidad: number = 1): void {
    if (cantidad > 0 && this.getCantidad() > cantidad) {
      this.setCantidad(this.getCantidad() - cantidad);
    } else if (cantidad > 0 && this.getCantidad() <= cantidad) {
      this.setCantidad(0);
    }
  }

  // Método para verificar si el producto puede ser comprado en la cantidad actual
  public puedeComprar(): boolean {
    return this.getProducto().puedeComprar(this.getCantidad());
  }
}