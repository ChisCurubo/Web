import AbstractUsuario from "../../../usuario/types/AbstractTypes/AbstractUsuario";
import { Carrito } from "../interface/CarritoInterface";
import AbstractCarritoProducto from "./AbstractCarritoProducto";

export default abstract class AbstractCarrito {
  protected idCarrito: number;
  protected statusCarrito: boolean;
  protected carritoProducto: AbstractCarritoProducto;
  protected totalCarrito: number;
  protected fechaCarrito: Date;

  constructor(carritoAttributes: Carrito) {
    this.idCarrito = this.validateIdCarrito(carritoAttributes.idCarrito);
    this.statusCarrito = carritoAttributes.statusCarrito;
    this.totalCarrito = this.validateTotalCarrito(carritoAttributes.totalCarrito);
    this.carritoProducto = carritoAttributes.carritoProducto;
    this.fechaCarrito = this.validateFechaCarrito(carritoAttributes.fechaCarrito);
  }

  public abstract isNull: () => boolean;

  //Getters -----------------------------------------
  public getIdCarrito(): number {
    return this.idCarrito;
  }

  public getStatusCarrito(): boolean {
    return this.statusCarrito;
  }

  public getCarritoProducto(): AbstractCarritoProducto {
    return this.carritoProducto;
  }

  public getTotalCarrito(): number {
    return this.totalCarrito;
  }

  public getFechaCarrito(): Date {
    return this.fechaCarrito;
  }

  //Setters con validaciones --------------------------------
  public setIdCarrito(id: number): void {
    this.idCarrito = this.validateIdCarrito(id);
  }

  public setStatusCarrito(status: boolean): void {
    this.statusCarrito = status;
  }

  public setCarritoProducto(carritoProducto: AbstractCarritoProducto): void {
    this.carritoProducto = (carritoProducto);
  }

  public setTotalCarrito(total: number): void {
    this.totalCarrito = this.validateTotalCarrito(total);
  }

  public setFechaCarrito(fecha: Date): void {
    this.fechaCarrito = this.validateFechaCarrito(fecha);
  }

  //Validación ---------------------------------------
  private validateIdCarrito(id: number): number {
    if (id <= 0) {
      throw new Error("El ID del carrito debe ser un número entero positivo.");
    }
    return id;
  }

  private validateTotalCarrito(total: number): number {
    if (total <= 0) {
      throw new Error("El total del carrito debe ser un número mayor o igual a cero.");
    }
    return total;
  }

  private validateFechaCarrito(fecha: Date): Date {
    if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
      throw new Error("La fecha del carrito debe ser una instancia válida de Date.");
    }
    return fecha;
  }
}
