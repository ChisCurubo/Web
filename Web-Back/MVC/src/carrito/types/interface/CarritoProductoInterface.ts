import AbstractProducto from "../../../producto/types/AbstractTypes/AbstractProducto";


export default interface CarritoProducto {
    idCarritoProducto: number;
    idProducto: AbstractProducto [];
    horaCarritoProducto: Date[];
}