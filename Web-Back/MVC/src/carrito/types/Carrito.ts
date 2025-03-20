import AbstractCarrito from './AbstractTypes/AbstractCarrito';


export class Carrito extends AbstractCarrito {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };
}
