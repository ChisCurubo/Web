
import AbstractProducto from "../../../ModuloProductos/Domain/Producto/AbstractProducto";
import { IItemCarritoCompleto, IItemCarritoResumen, ItemCarritoInterface } from "./Interfaces/ItemCarritoInterfaces";


export default abstract class AbstractItemCarrito {
  protected idItemCarrito: number;
  protected usuarioId: number;
  protected productoItem: AbstractProducto;
  protected cantidadItem: number;

  constructor(itemCarritoInterface: ItemCarritoInterface) {
    this.idItemCarrito = itemCarritoInterface.idItemCarrito;
    this.usuarioId = itemCarritoInterface.usuarioId;
    this.productoItem = itemCarritoInterface.producto;
    this.cantidadItem = itemCarritoInterface.cantidad;
  }

  // Métodos abstractos
  public abstract toString(): string;
  public abstract isNull(): boolean;

  // Validaciones
  protected validateId(id: number): boolean {
    return typeof id === "number" && id > 0;
  }

  protected validateUsuarioId(usuarioId: number): boolean {
    return typeof usuarioId === "number" && usuarioId > 0;
  }

  protected validateCantidad(cantidad: number): boolean {
    return typeof cantidad === "number" && cantidad > 0;
  }

  // Getters
  public getId(): number {
    return this.idItemCarrito;
  }

  public getUsuarioId(): number {
    return this.usuarioId;
  }

  public getProducto(): AbstractProducto {
    return this.productoItem;
  }

  public getCantidad(): number {
    return this.cantidadItem;
  }

  public getSubtotal(): number {
    return this.productoItem.getPrecio() * this.cantidadItem;
  }

  // Setters con validación
  public setId(id: number): void {
    if (this.validateId(id)) this.idItemCarrito = id;
  }

  public setUsuarioId(usuarioId: number): void {
    if (this.validateUsuarioId(usuarioId)) this.usuarioId = usuarioId;
  }

  public setProducto(producto: AbstractProducto): void {
    this.productoItem = producto;
  }

  public setCantidad(cantidad: number): void {
    if (this.validateCantidad(cantidad)) this.cantidadItem = cantidad;
  }



  
  // Métodos para transformar a diferentes vistas
  public toResumen(): IItemCarritoResumen {
    return {
      idProducto: this.productoItem.getId(),
      nombreProducto: this.productoItem.getNombre(),
      tallaProducto: this.productoItem.getTallaNombre(),
      precioProducto: `${this.productoItem.getPrecio().toFixed(2)}`,
      cantidad: this.cantidadItem,
      subtotal: `${this.getSubtotal().toFixed(2)}`
    };
  }

  public toCompleto(): IItemCarritoCompleto {
    return {
      idProducto: this.productoItem.getId(),
      Producto: this.productoItem.getNombre(),
      Talla: this.productoItem.getTallaNombre(),
      Marca: this.productoItem.getMarcaNombre(),
      Cantidad: this.cantidadItem,
      PrecioUnitario: `€${this.productoItem.getPrecio().toFixed(2)}`,
      Subtotal: `€${this.getSubtotal().toFixed(2)}`
    };
  }

// me estaba imprimeindo object por eso hice esto disculpe mr lennin 

 // Método getProductoId para acceder directamente al ID del producto
public getProductoId(): number {
  // Verificar si el método getId existe y usarlo
  if (this.productoItem && typeof this.productoItem.getId === 'function') {
    return this.productoItem.getId();
  }
  
  // Intentar acceder directamente a la propiedad id si existe
  if (this.productoItem && 'id' in this.productoItem) {
    return (this.productoItem as any).id;
  } 
  
  // Intentar acceder a idProducto como última opción
  if (this.productoItem && 'idProducto' in this.productoItem) {
    return (this.productoItem as any).idProducto;
  }
  
  // Si no se puede obtener el ID, devolver un valor por defecto (0 o -1)
  return 0; // O puedes usar -1 para indicar que no hay ID válido
}
}