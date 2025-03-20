import AbstractProducto from './AbstractTypes/AbstractUsuario';


export class Usuario extends AbstractProducto {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };
}
