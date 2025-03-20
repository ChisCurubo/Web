import AbstractPermiso from "../AbstractTypes/AbstractPermiso";

export interface Rol {
  idRol: number;
  nombreRol: string;
  descripcionRol: string;
  estadoRol: boolean;
  permisos: AbstractPermiso[]
}
