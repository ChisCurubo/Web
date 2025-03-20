import AbstractPermiso from "../AbstractTypes/AbstractPermiso";
import AbstractRol from "../AbstractTypes/AbstractRol";

export interface RolesPermiso {
    idRolesPermiso: number;
    idRol: AbstractRol[];
    idPermiso: AbstractPermiso[];
    estado: boolean;
    }