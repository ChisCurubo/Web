import AbstractPermiso from "./AbstractPermiso";
import AbstractRol from "./AbstractRol";
import { RolesPermiso } from "../interface/RolesPermisoInterface";

export default abstract class AbstractRolesPermiso {
    protected idRolPermiso: number;
    protected idRol: AbstractRol[];
    protected idPermiso: AbstractPermiso[];
    protected estadoRolPermiso: boolean;

    constructor(rolesPermisoInterface: RolesPermiso) {
        this.idRolPermiso = rolesPermisoInterface.idRolesPermiso;
        this.idRol = rolesPermisoInterface.idRol;
        this.idPermiso = rolesPermisoInterface.idPermiso;
        this.estadoRolPermiso = rolesPermisoInterface.estado;
    }
    public abstract isNull(): boolean
   

}