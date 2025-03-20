import AbstractPermiso from "../AbstractTypes/AbstractPermiso";

export default class NullPermiso extends AbstractPermiso {
    public override isNull(): boolean {
        return true;
    }
    constructor() {
        super({
        idPermiso: 0,
        nombrePermiso: '',
        tipo: '',
        estadoPermiso: false
        });
    }
}