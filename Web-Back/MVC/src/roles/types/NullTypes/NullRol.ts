import AbstractRol from '../AbstractTypes/AbstractRol';
import NullPermiso from './NullPermiso';


export default class NullRol extends AbstractRol {
  public override isNull(): boolean {
    return true;
  }
  constructor() {
    super({
      idRol: 0,
      nombreRol: '',
      descripcionRol: '',
      estadoRol: false,
      permisos: [new NullPermiso()]
    });
  }
}
