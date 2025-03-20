import AbstractDescuento from '../AbstractTypes/AbstractDescuento';

export  default class NullDescuento extends AbstractDescuento {
  constructor() {
    super({
      idDescuento: 0,
      nombreDescuento: 'Sin Descuento',
      estadoDescuento: false,
    });
  }

  public isNull = (): boolean => {
    return true; // Este objeto es nulo.
  };
}
