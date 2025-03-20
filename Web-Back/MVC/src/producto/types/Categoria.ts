import AbstractCategoria from './AbstractTypes/AbstractCategoria';


export class Categoria extends AbstractCategoria {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };
}
