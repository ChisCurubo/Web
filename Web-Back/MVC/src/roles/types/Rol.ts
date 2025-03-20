import AbstractRol from './AbstractTypes/AbstractRol';


export class Rol extends AbstractRol {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };
}
