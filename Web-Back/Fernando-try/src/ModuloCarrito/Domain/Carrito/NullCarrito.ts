import { IItemCarritoResumen } from "../iItemCarrito/Interfaces/ItemCarritoInterfaces";
import AbstractCarrito from "./AbstractCarrito";
import { ICarritoCompleto, ITotalesCarrito } from "./interfaces/carritointerfaces";


export default class NullCarrito extends AbstractCarrito {
  constructor() {
    super({
      idCarrito: 0,
      usuarioId: 0,
      items: []
    });
  }

  public isNull(): boolean {
    return true;
  }

  public override toString(): string {
    return "NullCarrito";
  }

  // Sobrescribir setters para que no hagan nada
  public override setId = (_id: number): void => {
    return;
  };

  public override setUsuarioId = (_usuarioId: number): void => {
    return;
  };

  public override setItems = (_items: any[]): void => {
    return;
  };

  // Sobrescribir getters para valores nulos
  public override getCantidadTotalArticulos(): number {
    return 0;
  }

  public override getSubtotal(): number {
    return 0;
  }

  public override getTotalConIVA(): number {
    return 0;
  }

  public override getMensajeEnvio(): string {
    return 'Envío gratis en compras mayores a $1,000';
  }

  // Sobrescribir métodos de transformación
  public override toResumen(): IItemCarritoResumen[] {
    return [];
  }

  public override toCompleto(): ICarritoCompleto {
    return {
      productos: []
    };
  }

  public override toTotales(): ITotalesCarrito {
    return {
      Subtotal: '$0.00',
      CantidadTotalArticulos: 0,
      TotalConIVA: '$0.00',
      MensajeEnvio: 'Envío gratis en compras mayores a 60 € '
    };
  }
 
  
}