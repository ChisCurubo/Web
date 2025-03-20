import AbstractProducto from './AbstractTypes/AbstractProducto';


export class Producto extends AbstractProducto {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };
}
