import AbstractCarrito from "../../../ModuloCarrito/Domain/Carrito/AbstractCarrito";
import AbstractUsuario from "../../../ModuloUsuario/Domain/Usuario/AbstractUsuario";
import { IPagoInfo, IRespuestaPago, PagoInterface } from "./interfaces/PagoInterfaces";

export default abstract class AbstractPago {
  protected idPago: number;
  protected totalPago: string; 
  protected carrito: AbstractCarrito; 
  protected estadoPago: number;

  protected estadoCarrito: number; 
  protected usuario: AbstractUsuario; 
  protected totalCarrito: string; 
  protected horaCarrito: Date; 

  constructor(pagoInterface: PagoInterface) {
    this.idPago = pagoInterface.idPago;
    this.totalPago = pagoInterface.totalPago 
    this.carrito = pagoInterface.carrito
    this.estadoPago = pagoInterface.estadoPago 

    this.estadoCarrito = pagoInterface.estadoCarrito 
    this.usuario = pagoInterface.usuario
    this.totalCarrito = pagoInterface.totalCarrito || "0"; 
    this.horaCarrito = pagoInterface.horaCarrito ? new Date(pagoInterface.horaCarrito) : new Date();
  }

  // Métodos abstractos
  public abstract toString(): string;
  public abstract isNull(): boolean;

  // Validaciones
  protected validateId(id: number): boolean {
    return typeof id === "number" && id > 0;
  }

  protected validateTotalPago(totalPago: string): boolean {
    return typeof totalPago === "string" && parseFloat(totalPago) >= 0;
  }

  protected validateEstadoPago(estado: number): boolean {
    return typeof estado === "number" && (estado === 0 || estado === 1);
  }

  // Getters
  public getIdPago(): number {
    return this.idPago;
  }

  public getTotalPago(): string {
    return this.totalPago;
  }


  public getEstadoPago(): number {
    return this.estadoPago;
  }

 

  public getEstadoCarrito(): number {
    return this.estadoCarrito;
  }


  public getTotalCarrito(): string {
    return this.totalCarrito;
  }

  public getHoraCarrito(): Date {
    return this.horaCarrito;
  }

  // Setters con validación
  public setIdPago(idPago: number): void {
    if (this.validateId(idPago)) this.idPago = idPago;
  }

  public setTotalPago(totalPago: string): void {
    if (this.validateTotalPago(totalPago)) this.totalPago = totalPago;
  }

  public setEstadoPago(estadoPago: number): void {
    if (this.validateEstadoPago(estadoPago)) this.estadoPago = estadoPago;
  }



  public setEstadoCarrito(estadoCarrito: number): void {
    if (this.validateEstadoPago(estadoCarrito)) this.estadoCarrito = estadoCarrito;
  }


  public setTotalCarrito(totalCarrito: string): void {
    if (this.validateTotalPago(totalCarrito)) this.totalCarrito = totalCarrito;
  }


  // Métodos de negocio
  public esPagoCompletado(): boolean {
    return this.estadoPago === 1;
  }

  public esPagoPendiente(): boolean {
    return this.estadoPago === 0;
  }

  // Método para transformar a información de pago
  public toInfo(): IPagoInfo {
    return {
      idPago: this.idPago,
      totalPago: this.totalPago,

      estadoPago: this.estadoPago,
   
      estadoCarrito: this.estadoCarrito,
    
      totalCarrito: this.totalCarrito,
      horaCarrito: this.horaCarrito.toISOString(),
    };
  }

  public abstract toInfomessege(): IRespuestaPago;
}