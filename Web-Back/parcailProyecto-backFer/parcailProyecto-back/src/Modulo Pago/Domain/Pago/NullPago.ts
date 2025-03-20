import NullCarrito from '../../../ModuloCarrito/Domain/Carrito/NullCarrito';
import NullUsuario from '../../../ModuloUsuario/Domain/Usuario/NullUsuario';
import AbstractPago from './AbstractPago';
import { IRespuestaPago, IPagoInfo } from './interfaces/PagoInterfaces';

export default class NullPago extends AbstractPago {
  constructor() {
    super({
      idPago: 0,
      totalPago: "0", 
      carrito: new NullCarrito,
      estadoPago: 0,
  
      estadoCarrito: 0, 
      usuario: new NullUsuario,
      totalCarrito: "0",
      horaCarrito: new Date(0).toISOString(),
    });
  }

  public isNull(): boolean {
    return true;
  }

  public override toString(): string {
    return 'NullPago';
  }

  // Sobrescribir setters para que no hagan nada
  public override setIdPago(_idPago: number): void {
    // No hacer nada
  }



  // Sobrescribir métodos de negocio
  public override esPagoCompletado(): boolean {
    return false;
  }

  public override esPagoPendiente(): boolean {
    return false;
  }

  // Sobrescribir método de transformación
  public override toInfo(): IPagoInfo {
   
      return {
        idPago: 0,
        totalPago: "0",
     
        estadoPago: 0,
       
        estadoCarrito: 0,
       
        totalCarrito: "0",
        horaCarrito: this.horaCarrito.toISOString(),
      };
    }


    public override toInfomessege(): IRespuestaPago {
      return {
        mensaje: 'No se encontró información del pago.',
      };
    }
  }


