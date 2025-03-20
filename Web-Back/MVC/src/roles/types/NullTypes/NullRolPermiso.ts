import NullPermiso from "./NullPermiso";
import NullRol from "./NullRol";
import AbstractRolPermiso from "../AbstractTypes/AbstractRolesPermiso";

export default class NullRolPermiso extends AbstractRolPermiso {
    public override isNull(): boolean {
        return true;
    }
    constructor() {
        super({
            idRolesPermiso: 0,
            idRol: [new NullRol()],
            idPermiso:[ new NullPermiso()],
            estado: false
        });
    }
}