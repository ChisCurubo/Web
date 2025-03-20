import AbstractCarrito from "../AbstractTypes/AbstractCarrito";
import NullCarritoProducto from "./NullCarritoProducto";

export default class NullCarrito extends AbstractCarrito {
  constructor() {
    super({
      idCarrito: 0,
      carritoProducto: new NullCarritoProducto(),
      totalCarrito: 0,
      statusCarrito: false,
      fechaCarrito: new Date(),
    });
  }

  public isNull = (): boolean => {
    return true; // Este objeto representa un carrito nulo.
  };
}
