import AbstractItemCarrito from "../iItemCarrito/AbstractItemCarrito";
import { IItemCarritoResumen } from "../iItemCarrito/Interfaces/ItemCarritoInterfaces";
import { CarritoInterface, ICarritoCompleto, ITotalesCarrito } from "./interfaces/carritointerfaces";

export default abstract class AbstractCarrito {
  protected idCarrito: number;
  protected usuarioId: number;
  protected itemsCarrito: AbstractItemCarrito[];

  constructor(carritoInterface: CarritoInterface) {
    this.idCarrito = carritoInterface.idCarrito;
    this.usuarioId = carritoInterface.usuarioId;
    this.itemsCarrito = carritoInterface.items || [];
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

  // Getters
  public getId(): number {
    return this.idCarrito;
  }

  public getUsuarioId(): number {
    return this.usuarioId;
  }

  public getItems(): AbstractItemCarrito[] {
    return [...this.itemsCarrito];
  }

  public getCantidadTotalArticulos(): number {
    return this.itemsCarrito.reduce((total, item) => total + item.getCantidad(), 0);
  }

  public getSubtotal(): number {
    return this.itemsCarrito.reduce((total, item) => total + item.getSubtotal(), 0);
  }

  public getTotalConIVA(): number {
    return this.getSubtotal() * 1.21; 
  }

  public getMensajeEnvio(): string {
    const minimoEnvioGratis = 45;
    const subtotal = this.getSubtotal();
  
    if (subtotal >= minimoEnvioGratis) {
      return 'Envío gratis';
    } else {
      const falta = (minimoEnvioGratis - subtotal).toFixed(2);
      return `Te faltan ${falta}€ para obtener envío gratis`;
    }
  }
  

  // Setters con validación
  public setId(id: number): void {
    if (this.validateId(id)) this.idCarrito = id;
  }

  public setUsuarioId(usuarioId: number): void {
    if (this.validateUsuarioId(usuarioId)) this.usuarioId = usuarioId;
  }

  public setItems(items: AbstractItemCarrito[]): void {
    this.itemsCarrito = items;
  }

  // Métodos para transformar a diferentes vistas
  public toResumen(): IItemCarritoResumen[] {
    return this.itemsCarrito.map(item => item.toResumen());
  }

  public toCompleto(): ICarritoCompleto {
    return {
      productos: this.itemsCarrito.map(item => item.toCompleto())
    };
  }

  public toTotales(): ITotalesCarrito {
    return {
      Subtotal: `$${this.getSubtotal().toFixed(2)}`,
      CantidadTotalArticulos: this.getCantidadTotalArticulos(),
      TotalConIVA: `$${this.getTotalConIVA().toFixed(2)}`,
      MensajeEnvio: this.getMensajeEnvio()
    };
  }
}