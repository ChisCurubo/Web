
import NullProducto from "../../../ModuloProductos/Domain/Producto/NullProducto";
import AbstractItemCarrito from "./AbstractItemCarrito";
import { IItemCarritoCompleto, IItemCarritoResumen } from "./Interfaces/ItemCarritoInterfaces";


export default class NullItemCarrito extends AbstractItemCarrito {
  constructor() {
    super({
      idItemCarrito: 0,
      usuarioId: 0,
      producto: new NullProducto(),
      cantidad: 0
    });
  }

  public isNull(): boolean {
    return true;
  }

  public override toString(): string {
    return "NullItemCarrito";
  }

  // Sobrescribir setters para que no hagan nada
  public override setId = (_id: number): void => {
    return;
  };

  public override setUsuarioId = (_usuarioId: number): void => {
    return;
  };

  public override setProducto = (_producto: any): void => {
    return;
  };

  public override setCantidad = (_cantidad: number): void => {
    return;
  };

  // Sobrescribir métodos de transformación
  public override toResumen(): IItemCarritoResumen {
    return {
      idProducto: 0,
      nombreProducto: "NULL",
      tallaProducto: "NULL",
      precioProducto: "$0.00",
      cantidad: 0,
      subtotal: "$0.00"
    };
  }

  public override toCompleto(): IItemCarritoCompleto {
    return {
      idProducto: 0,
      Producto: "NULL",
      Talla: "NULL",
      Marca: "NULL",
      Cantidad: 0,
      PrecioUnitario: "$0.00",
      Subtotal: "$0.00"
    };
  }
}