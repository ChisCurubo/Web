import AbstractCarritoProducto from "../AbstractTypes/AbstractCarritoProducto";
import NullProducto from "../../../producto/types/NullTypes/NullProducto";

export default class NullCarritoProducto extends AbstractCarritoProducto {
    constructor() {
        super({
            idCarritoProducto: 0,
            idProducto: [new NullProducto()],
            horaCarritoProducto: [new Date()],
        });
    }

    public isNull(): boolean {
        return true; // Indica que este es un objeto nulo.
    }
}
