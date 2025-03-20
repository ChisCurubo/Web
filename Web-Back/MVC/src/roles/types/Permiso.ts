import AbstractPermiso from './AbstractTypes/AbstractPermiso';


export class Permiso extends AbstractPermiso {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };
}
