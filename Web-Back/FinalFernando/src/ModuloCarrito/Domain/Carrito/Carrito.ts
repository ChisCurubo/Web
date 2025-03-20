import AbstractItemCarrito from "../iItemCarrito/AbstractItemCarrito";
import AbstractCarrito from "./AbstractCarrito";
import { CarritoInterface } from "./interfaces/carritointerfaces";

export default class Carrito extends AbstractCarrito {
  constructor(carritoInterface: CarritoInterface) {
    super(carritoInterface);
  }

  public isNull(): boolean {
    return false;
  }

  public override toString(): string {
    return `Carrito: { 
      idCarrito: ${this.getId()}, 
      usuarioId: ${this.getUsuarioId()}, 
      cantidadItems: ${this.getItems().length}, 
      cantidadTotalArticulos: ${this.getCantidadTotalArticulos()}, 
      subtotal: ${this.getSubtotal().toFixed(2)}, 
      totalConIVA: ${this.getTotalConIVA().toFixed(2)}
    }`;
  }

  // Métodos adicionales para gestión del carrito
  public agregarItem(item: AbstractItemCarrito): void {
    // Verificar si el producto ya existe en el carrito
    const itemExistente = this.itemsCarrito.find(
      i => i.getProducto().getId() === item.getProducto().getId()
    );

    if (itemExistente) {
      // Si existe, incrementar la cantidad
      itemExistente.setCantidad(itemExistente.getCantidad() + item.getCantidad());
    } else {
      // Si no existe, agregar el nuevo item
      this.itemsCarrito.push(item);
    }
  }

  public eliminarItem(idProducto: number): void {
    this.itemsCarrito = this.itemsCarrito.filter(
      item => item.getProducto().getId() !== idProducto
    );
  }

  public actualizarCantidad(idProducto: number, cantidad: number): void {
    const item = this.itemsCarrito.find(
      i => i.getProducto().getId() === idProducto
    );

    if (item) {
      if (cantidad <= 0) {
        // Si la cantidad es 0 o menor, eliminar el item
        this.eliminarItem(idProducto);
      } else {
        // Actualizar la cantidad
        item.setCantidad(cantidad);
      }
    }
  }

  public vaciar(): void {
    this.itemsCarrito = [];
  }

  public tieneProductos(): boolean {
    return this.itemsCarrito.length > 0;
  }

  public verificarDisponibilidad(): boolean {
    // Verificar que todos los productos estén disponibles en las cantidades solicitadas
    return this.itemsCarrito.every(item => 
      item.getProducto().puedeComprar(item.getCantidad())
    );
  }
}