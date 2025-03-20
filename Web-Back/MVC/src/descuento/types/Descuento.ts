import AbstractDescuento from './AbstractTypes/AbstractDescuento';


export class Descuento extends AbstractDescuento {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };
}
