import AbstractPago from "./AbstractPago";
import { IRespuestaPago, PagoInterface } from "./interfaces/PagoInterfaces";

export default class Pago extends AbstractPago {
  constructor(pagoInterface: PagoInterface) {
    super(pagoInterface);
  }

  public isNull(): boolean {
    return false;
  }

  public override toInfomessege(): IRespuestaPago {
    return {
      mensaje: `Pago registrado con éxito: ID ${this.getIdPago()}, Monto $${this.getTotalCarrito()}, Estado: ${this.getEstadoPago() === 1 ? 'Completado' : 'Pendiente'}`,
    };
  }

  public toString(): string {
    return `Pago { 
      ID: ${this.getIdPago()}, 
      Total: $${this.getTotalPago()}, 

      Estado: ${this.getEstadoPago() === 1 ? 'Completado' : 'Pendiente'}, 
      
      Total Carrito: $${this.getTotalCarrito()}, 
      Hora: ${this.getHoraCarrito().toISOString()} 
    }`;
  }
}