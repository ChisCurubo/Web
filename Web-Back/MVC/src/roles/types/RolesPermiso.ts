import AbstractRolesPermiso from "./AbstractTypes/AbstractRolesPermiso";



export class RolesPermiso extends AbstractRolesPermiso {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };
}
